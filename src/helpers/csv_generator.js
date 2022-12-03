// generates a csv-formatted string from 2 lvl array
import Papa from 'papaparse'

export const genCsv = (array) => Papa.unparse(array)

export const parseCSV = (data) => Papa.parse(data, { header: true })
