import { FileSystemLocations } from "../../../../constants/global"

export class FileSystemInitialization {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async execute() {
        await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP)
    }
}