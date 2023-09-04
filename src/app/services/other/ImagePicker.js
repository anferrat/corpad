import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { Error, errors } from "../../utils/Error"
import { ExternalFile } from "../../entities/survey/other/ExternalFile"

export class ImagePicker {
    constructor() {
    }

    async getImageFromCamera() {
        const result = await launchCamera({
            mediaType: 'photo',
            quality: 1,
            cameraType: 'back',
            presentationStyle: 'overCurrentContext'
        })
        if (result.didCancel)
            throw new Error(errors.GENERAL, 'Camera selection cancelled', 'User cancelled operation', 101)
        else if (result.errorCode === 'permission')
            throw new Error(errors.PERMISSION, 'Unable to access camera', 'Permission is not granted', 904)
        else if (result.errorCode)
            throw new Error(errors.CAMERA, 'Unable to access camera', result.errorMessage, 826)
        else {
            return new ExternalFile(result.assets[0].uri, result.assets[0].fileName)
        }
    }

    async getImageFromLibrary() {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        })
        if (result.didCancel)
            throw new Error(errors.GENERAL, 'Camera selection cancelled', 'User cancelled operation', 101)
        else if (result.errorCode)
            throw new Error(errors.CAMERA, 'Unable to access image library', result.errorMessage, 826)
        else {
            return new ExternalFile(result.assets[0].uri, result.assets[0].fileName)
        }
    }
}