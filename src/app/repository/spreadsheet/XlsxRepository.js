import { utils, read } from "xlsx";
import { Error, errors } from "../../utils/Error";

export class XlsxRepository {
    constructor() { }

    parseToCsv(base64BinaryFileContent) {
        try {
            const workbook = read(base64BinaryFileContent, { type: 'base64' })
            return {
                cropped: workbook.SheetNames.length > 1,
                csv: utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]])
            }
        }
        catch (er) {
            throw new Error(errors.GENERAL, 'Unable to parse XLSX file', er, 439)
        }
    }

}