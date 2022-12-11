import React, { useState } from 'react'
import { AddReadingModal } from "../../../components/AddReadingModal"
import Button from './components/Button'
import { sendRequest } from "../../../api/database"
import { testPointReadingsWithPotentials, potentialFields, potentialUnits } from "../../../constants/constants"
import { verifyTypes } from "../../../helpers/functions"
import { errorHandler } from "../../../helpers/error_handler"
import idGen from '../../../helpers/id_generator'

const AddButton = ({ itemType, navigateToSubitem, itemId }) => {
    const [visible, setVisible] = useState(false)
    const showModal = React.useCallback(() => setVisible(true), [])
    const hideModal = React.useCallback(() => setVisible(false), [])

    const onSelectHandler = async (cardType) => {
        const settings = await sendRequest('SELECT', 'SETTINGS', {})
        const subitemId = (itemType === 'TEST_POINT') ?
            await sendRequest('INSERT', 'CARD', { uid: idGen(), testPointId: itemId, type: cardType })
            :
            await sendRequest('INSERT', 'CIRCUIT', { uid: idGen(), rectifierId: itemId })
        if (settings.status === 200 && subitemId.status === 200) {
            if (!!settings.result.autoCreatePotentials && itemType === 'TEST_POINT')
                if (verifyTypes(cardType, testPointReadingsWithPotentials)) {
                    //if unable to insert default potentials - fail silently
                    await sendRequest('INSERT', 'POTENTIAL_BY_TYPE', { cardId: subitemId.result, uid: idGen(), permType: potentialFields[0].permType, unit: potentialUnits[settings.result.defaultPotentialUnit] })
                    await sendRequest('INSERT', 'POTENTIAL_BY_TYPE', { cardId: subitemId.result, uid: idGen(), permType: potentialFields[1].permType, unit: potentialUnits[settings.result.defaultPotentialUnit] })
                }
            navigateToSubitem(subitemId.result, true, itemType === 'TEST_POINT' ? cardType : 'CT')
        }
        else errorHandler(606)
    }

    return (
        <>
            <Button
                showModal={showModal}
                itemType={itemType}
                onSelect={onSelectHandler} />
            <AddReadingModal
                visible={visible}
                hideModal={hideModal}
                onSelect={onSelectHandler}
            />
        </>
    )
}

export default AddButton