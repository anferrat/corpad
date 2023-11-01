import { ExternalFileTypes, FileMimeTypes, FileSystemLocations } from "../../../../constants/global"
import { ExternalFile } from "../../../entities/survey/other/ExternalFile"

export class ExtrenalFileContentResolver {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }

    async _resolveFileType(path) {
        const type = await this.fileSystemRepo.getFileType(path)
        if (type && type.mime === FileMimeTypes.ZIP)
            return ExternalFileTypes.SURVEY_WITH_ASSETS
        else {
            const start = await this.fileSystemRepo.read(path, 11, 0, 'utf8')
            if (start === '{"version":')
                return ExternalFileTypes.SURVEY
            else return ExternalFileTypes.UNKNOWN_FILE
        }
    }

    async execute(url) {
        const file = new ExternalFile(url)
        try {
            let fileType = file.getFileType()
            if (fileType === ExternalFileTypes.UNKNOWN_FILE) {
                const tempFolder = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP)
                const path = `${tempFolder}/unknown.file`
                await this.fileSystemRepo.copyFile(file.getPath(), path)
                fileType = await this._resolveFileType(path)
                await this.fileSystemRepo.unlink(path)
            }
            file.setFileType(fileType)
            return file
        }
        catch (er) {
            return file
        }
    }

}