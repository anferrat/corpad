import { FileSystemLocations, MediaTypes } from "../../../../../constants/global"
import { Asset } from "../../../../entities/survey/other/Asset"

export class UpdateItemPhotos {
    constructor(assetRepo, fileSystemRepo, createAssetFileService, deleteAssetFileService) {
        this.assetRepo = assetRepo
        this.fileSystemRepo = fileSystemRepo
        this.createAssetFileService = createAssetFileService
        this.deleteAssetFileService = deleteAssetFileService
    }

    async execute(uriList, itemId, itemType) {

        const currentAssetDir = await this.fileSystemRepo.getLocation(FileSystemLocations.CURRENT_ASSETS)
        const assets = await this.assetRepo.getByItemId(itemId, itemType)

        const assetsToDelete = await Promise.all(assets.filter((asset) => {
            //returning the list of assets that were deleted
            asset.getSource(currentAssetDir)
            const { uri } = asset.source
            return !~uriList.indexOf(uri) && asset.mediaType === MediaTypes.IMAGE
        })
            .map(async (asset) => {
                //Deleteing asset files
                await this.deleteAssetFileService.execute(asset.fileName)
                return asset
            }))
        const assetsToAdd = await Promise.all(uriList.filter(uri => !~assets.findIndex(asset => {
            // returning list of assets that were created
            asset.getSource(currentAssetDir)
            return asset.source.uri === uri && asset.mediaType === MediaTypes.IMAGE
        })).map(async uri => {
            //creating asset files
            const { filename, uid } = await this.createAssetFileService.execute(uri)
            const currentTime = Date.now()
            return new Asset(null, uid, null, filename, MediaTypes.IMAGE, currentTime, currentTime, itemType, itemId)
        }))

        //generating new asset list and updating database
        const idsToDelete = assetsToDelete.map(({ id }) => id)
        const newAssets = assets.filter(({ id }) => !~idsToDelete.indexOf(id)).concat(assetsToAdd)
        await this.assetRepo.update(newAssets, itemType, itemId)
    }
}