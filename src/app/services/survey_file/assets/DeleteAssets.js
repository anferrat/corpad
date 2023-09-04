import { FileSystemLocations } from "../../../../constants/global"

export class DeleteAssets {
    constructor(fileSystemRepo, cloudFileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
        this.cloudFileSystemRepo = cloudFileSystemRepo
    }

    async execute(uid, isCloud = false) {
        await this.fileSystemRepo.removeDir(FileSystemLocations.ASSETS, uid)
        if (isCloud) {
            const assetFolderId = await this.cloudFileSystemRepo.getSurveyAssetFolderId(uid)
            await this.cloudFileSystemRepo.deleteFile(assetFolderId)
        }
    }
}