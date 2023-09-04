import { FileMimeTypes } from "../../../../constants/global"

export class UploadAssets {
    constructor(cloudFileSystemRepo) {
        this.cloudFileSystemRepo = cloudFileSystemRepo
    }

    async execute(fileList, uid, callback) {
        await this.cloudFileSystemRepo.getAppFolderId()
        await this.cloudFileSystemRepo.getAssetFolderId()
        const surveyAssetFolder = await this.cloudFileSystemRepo.getSurveyAssetFolderId(uid)
        for (let i = 0; i < fileList.length; i++) {
            const { filename, path } = fileList[i]
            await this.cloudFileSystemRepo.upload(path, filename, [surveyAssetFolder], FileMimeTypes.IMAGE)
            callback({ total: fileList.length, current: i })
        }
    }
}