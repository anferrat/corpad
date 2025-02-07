import { Reading } from "../../entities/survey/multimeter/Reading";
import { Error, errors } from "../../utils/Error";
import { SQLiteRepository } from "../../utils/SQLite";

export class MultimeterReadingRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async create(reading) {
        try {
            const { value, deviceTimestamp, type, unit, flag, isAc, deviceType } = reading
            const unitVal = typeof unit === 'number' ? unit.toFixed(0) : unit
            const result = await this.runSingleQueryTransaction(`INSERT INTO multimeterReadings (value, deviceTimestamp, type, unit, flag, isSet, isAc, deviceType) VALUES (?,?,?,?,?,?,?,?)`, [value, deviceTimestamp, type, unitVal, flag, false, isAc, deviceType])
            return new Reading(result.insertId, value, deviceTimestamp, type, unitVal, flag, isAc, deviceType)
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to create multimeter reading record', er)
        }
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction(`SELECT * FROM multimeterReadings ORDER BY deviceTimestamp DESC`, [])
            return this.generateArray(result.rows.length, result.rows.item).map(({ id, value, deviceTimestamp, type, unit, flag, isAc, deviceType }) => {
                return new Reading(id, value, deviceTimestamp, type, unit, flag, isAc, deviceType)
            })
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to get all readings', er)
        }
    }

    async delete(id) {
        try {
            await this.runSingleQueryTransaction('DELETE FROM multimeterReadings WHERE id=?', [id])
            return
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to delete multimeter reading', er)
        }
    }

    async deleteAll() {
        try {
            await this.runSingleQueryTransaction('DELETE FROM multimeterReadings', [])
            return
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to delete all multimeter readings', er)
        }
    }
}