import { sendCombinedRequest, sendRequest } from "../../api/database"
import idGen from '../../helpers/id_generator'
import { verifyTypes } from "../../helpers/functions"
import { testPointReadingsWithPotentials, potentialFields, potentialUnits } from "../../constants/constants"

export const addSubitem = async (itemType, itemId, subitemType) => {
    const isTP = (itemType === 'TEST_POINT')
    const request = await sendCombinedRequest([
        ['SELECT', 'SETTINGS', {}],
        isTP ? ['INSERT', 'CARD', { uid: idGen(), testPointId: itemId, type: subitemType }]
            : ['INSERT', 'CIRCUIT', { uid: idGen(), rectifierId: itemId }]
    ])
    if (request.status === 200) {
        if (!!request.result[0].autoCreatePotentials && isTP)
            if (verifyTypes(subitemType, testPointReadingsWithPotentials)) {
                //if unable to insert default potentials - fail silently
                await sendRequest('INSERT', 'POTENTIAL_BY_TYPE', [
                    { cardId: request.result[1], uid: idGen(), permType: potentialFields[0].permType, unit: potentialUnits[request.result[0].defaultPotentialUnit] },
                    { cardId: request.result[1], uid: idGen(), permType: potentialFields[1].permType, unit: potentialUnits[request.result[0].defaultPotentialUnit] }])
            }
        return {
            status: 200,
            result: {
                subitemId: request.result[1],
                subitemType: subitemType
            }
        }
    }
    else return request
}