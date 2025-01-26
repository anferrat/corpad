import { FileMimeTypes, FileSystemLocations, MultimeterReadingTypes } from "../../../../../../constants/global"
import { CurrentUnitLabels, MultimeterTypeLabels, PotentialUnitLabels } from "../../../../../../constants/labels"
import { getFullDate } from "../../../../../../helpers/functions"

export class ExportAllHistoryReadings {
    constructor(multimeterReadingRepo, fileSystemRepo, csvParser, fileNameGenerator) {
        this.multimeterReadingRepo = multimeterReadingRepo
        this.fileSystemRepo = fileSystemRepo
        this.csvParser = csvParser
        this.fileNameGenerator = fileNameGenerator
    }

    _getUnitLabel(type, unit, isAc) {
        const suffix = `${isAc === null || isAc === undefined ? '' : (isAc ? 'AC' : 'DC')}`
        switch (type) {
            case MultimeterReadingTypes.CURRENT:
                return CurrentUnitLabels[unit] + suffix
            case MultimeterReadingTypes.VOLTAGE:
                return PotentialUnitLabels[unit] + suffix
            default:
                return ''
        }
    }

    _getValue(value) {
        return value === null ? '' : value.toFixed(3)
    }

    async execute() {
        const historyReadings = await this.multimeterReadingRepo.getAll()
        console.log(historyReadings)
        const header = [['Time', 'Value', 'Unit', 'Multimeter']]
        const array = header.concat(
            historyReadings.map(({ value, deviceTimestamp, unit, type, isAc, deviceType }) => [getFullDate(deviceTimestamp), this._getValue(value), this._getUnitLabel(type, unit, isAc), MultimeterTypeLabels[deviceType]]))
        console.log(array)
        const content = this.csvParser.unparse(array)

        const name = this.fileNameGenerator.execute('History_readings', 'csv')
        const path = await this.fileSystemRepo.writeFile(content, `${name}`, FileSystemLocations.EXPORTS, false)
        return {
            path,
            mimeType: FileMimeTypes.CSV
        }
    }
}