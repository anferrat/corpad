import { Platform } from "react-native"
import { FileSystemLocations } from "../../../../constants/global"

export class FileSystemInitialization {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async execute() {
        try {
            await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP)
            await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP_DOWNLOADS)
            if (Platform.OS !== 'ios')
                await this.fileSystemRepo.removeDir(FileSystemLocations.CACHE)
        }
        catch (er) {
            //No Errors thrown at initialization (when possible)
        }
    }
}