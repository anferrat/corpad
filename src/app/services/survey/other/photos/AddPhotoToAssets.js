import {  MediaTypes } from "../../../../../constants/global"
import { Asset } from "../../../../entities/survey/other/Asset"

export class AddPhotoToAssets {
    constructor(assetRepo, fileSystemRepo, createAssetFileService) {
        this.assetRepo = assetRepo
        this.fileSystemRepo = fileSystemRepo
        this.createAssetFileService = createAssetFileService
    }

    async execute(uri, name, itemId, itemType) {
        const { filename, uid, folder } = await this.createAssetFileService.execute(uri)
        const currentTime = Date.now()
        const asset = await this.assetRepo.create(new Asset(null, uid, null, filename, MediaTypes.IMAGE, currentTime, currentTime, itemType, itemId))
        asset.getSource(folder)
        return asset
    }
}