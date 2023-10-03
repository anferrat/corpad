import { FileMimeTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class ReadExternalGeoFile {
    constructor(geoParser, documentPicker, fileSystemRepo) {
        this.geoParser = geoParser
        this.documentPicker = documentPicker
        this.fileSystemRepo = fileSystemRepo
        this.MAXIMUM_FILE_SIZE = 5242880
    }

    async execute() {
        const file = await this.documentPicker.pickGeoFile()
        const { size } = await this.fileSystemRepo.getStat(file.uri)
        if (size > this.MAXIMUM_FILE_SIZE)
            throw new Error(errors.GENERAL, 'Unable to read geo file', 'File is larger than 5MB', 434)
        const content = await this.fileSystemRepo.readFile(file.uri)
        return {
            filename: file.name,
            data:this.geoParser.toGeoJson(content, FileMimeTypes.KML), //as string
            size: size
        }
    }
}