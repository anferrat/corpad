import { deleteMapLayer as deleteMapLayerRequest } from "../../../app/controllers/survey/other/MapLayerController"
import { errorHandler, warningHandler } from "../../../helpers/error_handler"
import { deleteMapLayerById } from "../../../store/actions/mapLayers"

export const deleteMapLayer = async (dispatch, navigation, params) => {
    const { isNew, layerId } = params
    const confirm = await warningHandler(61, 'Delete', 'Cancel')
    if (confirm) {
        if (isNew)
            navigation.goBack()
        else {
            deleteMapLayerRequest({ id: layerId },
                er => errorHandler(er),
                () => {
                    dispatch(deleteMapLayerById(layerId))
                    navigation.goBack()
                })
        }
    }
}