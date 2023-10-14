import { FileMimeTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class ReadExternalGeoFile {
    constructor(geoParser, documentPicker, fileSystemRepo, warningHandler) {
        this.geoParser = geoParser
        this.documentPicker = documentPicker
        this.fileSystemRepo = fileSystemRepo
        this.warningHandler = warningHandler
        this.MAXIMUM_FILE_SIZE = 3145728
        this.MAX_FEATURE_NUMBER = 500
    }

    async execute() {
        const file = await this.documentPicker.pickGeoFile()
        const { size } = await this.fileSystemRepo.getStat(file.uri)
        if (size > this.MAXIMUM_FILE_SIZE)
            throw new Error(errors.GENERAL, 'Unable to read geo file', 'File is larger than 5MB', 434)
        const content = await this.fileSystemRepo.readFile(file.uri)
        let data = this.geoParser.toGeoJson(content, FileMimeTypes.KML)
        if (data.features.length > this.MAX_FEATURE_NUMBER) {
            const confirm = await this.warningHandler.execute(`Geo file has more than ${this.MAX_FEATURE_NUMBER} features. Only first ${this.MAX_FEATURE_NUMBER} items will be imported. Do you wish to continue?`, 'Continue', 'Cancel')
            if (confirm) {
                data = { ...data, features: data.features.filter((_, i) => i < this.MAX_FEATURE_NUMBER) }
            }
            else throw new Error(errors.GENERAL, 'Operation cancelled', 'Operation is cancelled by user', 101)
        }
        return {
            filename: file.name,
            data, //as string
            size: size
        }
    }
}