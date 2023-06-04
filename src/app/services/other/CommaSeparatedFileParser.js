import Papa from 'papaparse'
import { Error, errors } from '../../utils/Error'

export class CommaSeparatedFileParser {
    constructor() {
    }

    async parse(text) {
        try {
            return await new Promise((resolve, reject) => {
                try {
                    Papa.parse(text, {
                        complete: (results) => resolve(results),
                        header: true,
                        transformHeader: (header, index) => header === "" ? `col_${index + 1}` : header,
                        skipEmptyLines: true,
                    })
                }
                catch (er) {
                    reject(er)
                }
            })
        }
        catch (er) {
            throw new Error(errors.GENERAL, 'Parser error', er, 513)
        }
    }

    parseFast(data) {
        return Papa.parse(data)
    }

    unparse(array, columns = null) {
        return Papa.unparse(array, { columns })
    }


}