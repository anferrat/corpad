import { ExternalFileTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

export class ReadExternalGeoFile {
    constructor(parseToGeoJson, documentPicker, fileSystemRepo, warningHandler, geoJsonValidation, parseKmzToKmlService) {
        this.documentPicker = documentPicker
        this.fileSystemRepo = fileSystemRepo
        this.warningHandler = warningHandler
        this.geoJsonValidation = geoJsonValidation
        this.parseToGeoJson = parseToGeoJson
        this.parseKmzToKmlService = parseKmzToKmlService
        this.MAXIMUM_FILE_SIZE = 3145728
        this.MAX_FEATURE_NUMBER = 500
    }

    async _conditionCheck(size) {
        if (size > this.MAXIMUM_FILE_SIZE)
            throw new Error(errors.GENERAL, 'Unable to read geo file', 'File is larger than 5MB', 434)
    }

    _readContent(file) {
        const fileType = file.getFileType()
        switch (fileType) {
            case ExternalFileTypes.KEYHOLE_MARKUP_ZIPPED:
                return this.parseKmzToKmlService.execute(file)
            case ExternalFileTypes.KEYHOLE_MARKUP_LANGUAGE:
            case ExternalFileTypes.GPS_EXCHANGE_FORMAT:
            case ExternalFileTypes.GEOJSON:
                return this.fileSystemRepo.readFile(file.uri)
            default:
                throw new Error(errors.GENERAL, 'Unable to continue with selected file type', 'Unsupported file type', 436)
        }
    }



    async execute() {
        const file = await this.documentPicker.pickGeoFile()

        const { size } = await this.fileSystemRepo.getStat(file.uri)

        await this._conditionCheck(size)

        const content = await this._readContent(file)

        let data = this.parseToGeoJson.execute(content, file.getFileType())

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
            data: JSON.stringify(data),
            size: size
        }
    }
}