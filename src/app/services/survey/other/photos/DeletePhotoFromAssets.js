import { FileSystemLocations } from "../../../../../constants/global"

export class DeletePhotoFromAssets {
    constructor(deleteAssetFileService, assetRepo) {
        this.deleteAssetFileService = deleteAssetFileService
        this.assetRepo = assetRepo
    }

    async execute(assetId, fileName, parentId, parentType) {
        const currentTime = Date.now()
        await this.deleteAssetFileService.execute(fileName)
        await this.assetRepo.delete(assetId, parentType, parentId, currentTime)
        return { currentTime }
    }
}