import { FileSystemLocations } from "../../../../../constants/global"

export class DeleteExportedFile {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async execute(path) {
        return await this.fileSystemRepo.unlink(path)
    }

    async executeForAll() {
        const path = await this.fileSystemRepo.getLocation(FileSystemLocations.EXPORTS)
        return await this.fileSystemRepo.unlink(path)
    }
}