import { FileSystemLocations } from "../../../../constants/global"

export class DownloadFiles {
    constructor(cloudFileSystemRepo, fileSystemRepo) {
        this.cloudFileSystemRepo = cloudFileSystemRepo
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(cloudFileList, destinationFolderPath, callback) {
        const tempFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP_DOWNLOADS)
        for (let i = 0; i < cloudFileList.length; i++) {
            const { cloudId, name } = cloudFileList[i]
            await this.cloudFileSystemRepo.download(cloudId, `${tempFolderPath}/file.download`)
            await this.fileSystemRepo.copyFile(`${tempFolderPath}/file.download`, `${destinationFolderPath}/${name}`)
            callback({ total: cloudFileList.length, current: i + 1 })
        }
    }
}