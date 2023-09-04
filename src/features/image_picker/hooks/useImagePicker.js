import { EventRegister } from "react-native-event-listeners"
import { addPhotoToAssets } from "../../../app/controllers/survey/other/MediaController"
import { errorHandler } from "../../../helpers/error_handler"
import { ImageSources } from "../../../constants/global"
import { useDispatch, useSelector } from 'react-redux'
import { updateLoader } from "../../../store/actions/settings"

const useImagePicker = ({ itemId, itemType }, closeSheet) => {
    const dispatch = useDispatch()
    const surveyUid = useSelector(state => state.settings.currentSurvey.uid)
    const addPhoto = async (imageSource, subtitle) => {
        closeSheet()
        dispatch(updateLoader(true, 'Adding image', subtitle))
        await addPhotoToAssets({ itemId, itemType, imageSource, surveyUid },
            (er) => {
                if (er !== 101)
                    errorHandler(er)
            },
            (asset) => EventRegister.emit('ASSET_ADDED', asset))
        dispatch(updateLoader(false, null, null))
    }

    const addPhotoFromLibrary = () => addPhoto(ImageSources.LIBRARY, 'Library')

    const addPhotoFromCamera = () => addPhoto(ImageSources.CAMERA, 'Camera')

    const addPhotoFromStorage = () => addPhoto(ImageSources.STORAGE, 'Storage')

    return {
        addPhotoFromLibrary,
        addPhotoFromCamera,
        addPhotoFromStorage
    }
}

export default useImagePicker