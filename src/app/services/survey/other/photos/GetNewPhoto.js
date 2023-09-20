import { ImageSources } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class GetNewPhoto {
    constructor(imagePicker, documentPicker) {
        this.imagePicker = imagePicker
        this.documentPicker = documentPicker
    }

    execute(imageSource) {
        switch (imageSource) {
            case ImageSources.CAMERA:
                return this.imagePicker.getImageFromCamera()
            case ImageSources.LIBRARY:
                return this.imagePicker.getImageFromLibrary()
            case ImageSources.STORAGE:
                return this.documentPicker.pickImage()
            default:
                throw new Error(errors.GENERAL, 'Unsupported image source', 'Unable to get image')
        }
    }
}