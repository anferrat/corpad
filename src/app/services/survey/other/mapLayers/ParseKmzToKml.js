import { ExternalFileTypes, FileSystemLocations } from "../../../../../constants/global"
import { ExternalFile } from "../../../../entities/survey/other/ExternalFile"
import { Error, errors } from "../../../../utils/Error"

export class ParseKmzToKml {
    constructor(fileSystemRepo) {
        this.fileSystemRepo = fileSystemRepo
    }


    async execute(file) {
        const tempFolderPath = await this.fileSystemRepo.getLocation(FileSystemLocations.TEMP)
        await this.fileSystemRepo.unzip(file.uri, tempFolderPath)

        const files = await this.fileSystemRepo.readDir(FileSystemLocations.TEMP)

        const kmlFiles = files.filter(({ isFile, filename, path }) => {
            if (isFile) {
                const file = new ExternalFile(path, filename)
                const fileType = file.getFileType()
                return fileType === ExternalFileTypes.KEYHOLE_MARKUP_LANGUAGE
            }
            else
                return false
        })
        if (kmlFiles.length > 0) {
            const content = await this.fileSystemRepo.readFile(kmlFiles[0].path)
            await this.fileSystemRepo.removeDir(FileSystemLocations.TEMP)
            return content
        }
        else
            throw new Error(errors.FILESYSTEM, 'Unable to read KMZ file', 'No KML file was found inside ZIP archive')
    }
}