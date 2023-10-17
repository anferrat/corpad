import { ExternalFileTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class ReadExternalGeoFile {
    constructor(geoParser, documentPicker, fileSystemRepo, warningHandler, geoJsonValidation, geoJsonParser) {
        this.geoParser = geoParser
        this.documentPicker = documentPicker
        this.fileSystemRepo = fileSystemRepo
        this.warningHandler = warningHandler
        this.geoJsonValidation = geoJsonValidation
        this.geoJsonParser = geoJsonParser
        this.MAXIMUM_FILE_SIZE = 3145728
        this.MAX_FEATURE_NUMBER = 500
    }

    async execute() {
        const file = await this.documentPicker.pickGeoFile()
        const fileType = file.getFileType()
        if (fileType !== ExternalFileTypes.KEYHOLE_MARKUP_LANGUAGE && fileType !== ExternalFileTypes.GPS_EXCHANGE_FORMAT)
            throw new Error(errors.GENERAL, 'Unable to continue with selected file type', 'Unsupported file type', 436)
        const { size } = await this.fileSystemRepo.getStat(file.uri)
        if (size > this.MAXIMUM_FILE_SIZE)
            throw new Error(errors.GENERAL, 'Unable to read geo file', 'File is larger than 5MB', 434)
        const content = await this.fileSystemRepo.readFile(file.uri)

        let data = this.geoParser.toGeoJson(content, fileType)

        data = this.geoJsonValidation.execute(data)

        if (data.features.length > this.MAX_FEATURE_NUMBER) {
            const confirm = await this.warningHandler.execute(`Geo file has more than ${this.MAX_FEATURE_NUMBER} features. Only first ${this.MAX_FEATURE_NUMBER} items will be imported. Do you wish to continue?`, 'Continue', 'Cancel')
            if (confirm) {
                data = { ...data, features: data.features.filter((_, i) => i < this.MAX_FEATURE_NUMBER) }
            }
            else throw new Error(errors.GENERAL, 'Operation cancelled', 'Operation is cancelled by user', 101)
        }
        return {
            filename: file.name,
            data: this.geoJsonParser.unparse(data),
            size: size
        }
    }
}