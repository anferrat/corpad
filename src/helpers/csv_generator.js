// generates a csv-formatted string from 2 lvl array
import Papa from 'papaparse'

export const genCsv = (array) => Papa.unparse(array)

export const parseCSV = (data) => Papa.parse(data, {
    header: true,
    transformHeader: (header, index) => {
        if (header === "")
            return `col_${index + 1}`
        else return header
    },
    skipEmptyLines: true,
})


export const parseSimple = (data) => Papa.parse(data)