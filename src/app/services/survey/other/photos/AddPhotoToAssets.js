import { Error, errors } from "../../../../utils/Error"
import { FileSystemLocations, ImageSources, MediaTypes } from "../../../../../constants/global"
import { guid } from "../../../../utils/guid"
import { Asset } from "../../../../entities/survey/other/Asset"

export class AddPhotoToAssets {
    constructor(assetRepo, imagePicker, fileSystemRepo, documentPicker) {
        this.assetRepo = assetRepo
        this.imagePicker = imagePicker
        this.fileSystemRepo = fileSystemRepo
        this.documentPicker = documentPicker
    }

    _getImage(imageSource) {
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

    async execute(itemId, itemType, imageSource) {
        const file = await this._getImage(imageSource)
        const path = file.getPath()
        const ext = path.substring(path.lastIndexOf('.') + 1, path.length)
        const uid = guid()
        const currentTime = Date.now()
        const newFileName = `image-${uid}${ext ? `.${ext}` : ''}`

        const destinationPath = await this.fileSystemRepo.getLocation(FileSystemLocations.CURRENT_ASSETS)

        await this.fileSystemRepo.copyFile(path, `${destinationPath}/${newFileName}`)

        const asset = await this.assetRepo.create(new Asset(null, uid, null, newFileName, MediaTypes.IMAGE, currentTime, currentTime, itemType, itemId))
        asset.getSource(destinationPath)
        return asset
    }
}