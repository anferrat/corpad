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

        files.filter(({ isFile, filename, path }) => {
            if (isFile) {
                const file = new ExternalFile(path, filename)
                file.getFileType()
                return file.fileType === ExternalFileTypes.KEYHOLE_MARKUP_LANGUAGE
            }
            else
                return false
        })
        if (files.length > 0)
            return await this.fileSystemRepo.readFile(files[0].path)
        else
            throw new Error(errors.FILESYSTEM, 'Unable to read KMZ file', 'No KML file was found inside ZIP archive')
    }
}