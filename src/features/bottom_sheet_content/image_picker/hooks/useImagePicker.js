import { EventRegister } from "react-native-event-listeners"
import { getNewPhoto } from "../../../../app/controllers/survey/other/MediaController"
import { errorHandler } from "../../../../helpers/error_handler"
import { ImageSources } from "../../../../constants/global"

const useImagePicker = ({ itemId, itemType }, closeSheet) => {
    const addPhoto = (imageSource) => {
        closeSheet()
        getNewPhoto({ imageSource },
            (er) => {
                if (er !== 101)
                    errorHandler(er)
            },
            ({ uri, name }) => EventRegister.emit('PHOTO_ADDED', { uri, name, itemId, itemType, imageSource }))
    }

    const addPhotoFromLibrary = () => addPhoto(ImageSources.LIBRARY)

    const addPhotoFromCamera = () => addPhoto(ImageSources.CAMERA)

    const addPhotoFromStorage = () => addPhoto(ImageSources.STORAGE)

    return {
        addPhotoFromLibrary,
        addPhotoFromCamera,
        addPhotoFromStorage
    }
}

export default useImagePicker