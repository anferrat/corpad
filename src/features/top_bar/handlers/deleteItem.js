import { errorHandler, warningHandler } from "../../../helpers/error_handler"
import { deleteItem as deleteItemRequest } from "../../../app/controllers/survey/items/ItemController"

const warningCodes = {
    TEST_POINT: 55,
    RECTIFIER: 53,
    PIPELINE: 54
}

export const deleteItem = async (itemId, itemType, navigation) => {
    const confirm = await warningHandler(warningCodes[itemType], 'Delete', 'Cancel')
    if (confirm) {
        await deleteItemRequest({ id: itemId, itemType }, er => errorHandler(er), () => navigation.navigate('PipelineSurvey'))
    }
}