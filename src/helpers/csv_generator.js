// generates a csv-formatted string from 2 lvl array
import Papa from 'papaparse'

export const genCsv = (array) => Papa.unparse(array)

export const parseCSV = (data) => new Promise((resolve, reject) => {
    try {
        Papa.parse(data, {
            complete: (results) => resolve({
                status: 200,
                result: results
            }),
            header: true,
            transformHeader: (header, index) => {
                if (header === "")
                    return `col_${index + 1}`
                else return header
            },
            skipEmptyLines: true,
        })
    }
    catch (er) {
        reject({
            status: 513
        })
    }
})


export const parseSimple = (data) => Papa.parse(data)