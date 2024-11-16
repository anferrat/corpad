import { ExternalFileTypes } from "../../../constants/global"
import { Error, errors } from "../../utils/Error"

export class SpreadsheetDataParser {
    constructor(fileSystemRepo, csvParser, xlsxRepo, alertHandler) {
        this.fileSystemRepo = fileSystemRepo
        this.csvParser = csvParser
        this.xlsxRepo = xlsxRepo
        this.alertHandler = alertHandler
    }

    async _getXlsxContent(uri) {
        const data = await this.fileSystemRepo.readBinaryFile(uri)
        const { csv } = this.xlsxRepo.parseToCsv(data)
        return csv
    }

    async _getContent(externalFile) {
        const type = externalFile.getFileType()
        switch (type) {
            case ExternalFileTypes.COMMA_SEPARATED_TEXT:
                return await this.fileSystemRepo.readFile(externalFile.uri)
            case ExternalFileTypes.XLSX:
                return await this._getXlsxContent(externalFile.uri)
            default:
                throw new Error(errors.GENERAL, 'Not supported file type', 'File type is not supported')
        }
    }

    async parseFile(externalFile) {
        const content = await this._getContent(externalFile)
        return this.csvParser.parse(content)
    }
}