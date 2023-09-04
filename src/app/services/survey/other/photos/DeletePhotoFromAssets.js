import { FileSystemLocations } from "../../../../../constants/global"

export class DeletePhotoFromAssets {
    constructor(fileSystemRepo, assetRepo) {
        this.fileSystemRepo = fileSystemRepo
        this.assetRepo = assetRepo
    }

    async execute(assetId, fileName, parentId, parentType) {
        const currentTime = Date.now()
        await this.fileSystemRepo.deleteFile(FileSystemLocations.CURRENT_ASSETS, fileName)
        await this.assetRepo.delete(assetId, parentType, parentId, currentTime)
        return { currentTime }
    }
}