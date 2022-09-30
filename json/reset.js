import { validateSurvey } from "./validation"
import idGen from '../components/IdGen'

export const surveyValuesReset = (surveyObject) => {
    const validation = validateSurvey(surveyObject)
    if (validation.status === 200 || !validation.corrupted)
        return {
            status: 200,
            result: {
                ...surveyObject,
                data: {
                    ...surveyObject.data,
                    survey: [[idGen(), surveyObject.data.survey[0][1], surveyObject.data.survey[0][2]]],
                    testPoints: statusReset(surveyObject.data.testPoints, 8),
                    cards: itemReset(surveyObject.data.cards, [9, 14, 18, 25]),
                    potentials: itemReset(surveyObject.data.potentials, [3]),
                    rectifiers: statusReset(surveyObject.data.rectifiers, 7),
                    circuits: itemReset(surveyObject.data.circuits, [6, 7, 8]),
                }
            }
        }
    else return { status: 413 }
}

//resets status field to number 3 (unknown status) for items
const statusReset = (itemList, z) => itemList.map(item => item.map((value, index) => index === z ? 3 : value))

//resets values to null for items of surveyObjects via array of indexes.
const itemReset = (itemList, z) => itemList.map(item => item.map((value, index) => {
    if (z.indexOf(index) === -1)
        return value
    else return null
}))