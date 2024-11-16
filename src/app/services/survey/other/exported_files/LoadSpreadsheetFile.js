import { ExternalFile } from "../../../../entities/survey/other/ExternalFile"

export class LoadSpreadsheetFile {
    constructor(spreadsheetDataParser) {
        this.spreadsheetDataParser = spreadsheetDataParser
        this.MAX_ROWS = 100
        this.MAX_FIELDS = 50
    }

    async execute(path) {
        const file = new ExternalFile(path)
        const content = await this.spreadsheetDataParser.parseFile(file)
        const { data, meta } = content
        const rowLimitReached = data.length > (this.MAX_ROWS)
        const fieldsLimitReached = meta.fields.length > (this.MAX_FIELDS)
        const result = data.filter((_, i) => i <= (this.MAX_ROWS - 1))
        const fields = meta.fields.filter((_, i) => i <= (this.MAX_FIELDS - 1))
        return {
            data: result,
            fields,
            rowLimitReached,
            fieldsLimitReached
        }
    }
}