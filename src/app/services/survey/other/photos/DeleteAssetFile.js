import { FileSystemLocations } from "../../../../../constants/global"

export class DeleteAssetFile {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(filename) {
        return await this.fileSystemRepo.deleteFile(FileSystemLocations.CURRENT_ASSETS, filename)
    }
}