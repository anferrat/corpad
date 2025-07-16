import { SQLiteRepository } from "../../utils/SQLite"
import { Error, errors } from "../../utils/Error"
import { Calculator } from "../../entities/Calculator"

export class CalculatorRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async save(calculator) {
        const { id, name, data, timeCreated, latitude, longitude, type } = calculator
        try {
            const { insertId } = await this.runSingleQueryTransaction('INSERT INTO calculators (id, timeCreated, calculatorType, data, name, latitude, longitude) VALUES (?,?,?,?,?,?,?)', [id, timeCreated, type, JSON.stringify(data), name, latitude, longitude])
            return new Calculator(insertId, name, type, data, timeCreated, latitude, longitude)
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to save calculator', err)
        }
    }

    async getList(type) {
        try {
            const { rows } = await this.runSingleQueryTransaction('SELECT * FROM calculators WHERE calculatorType=? ORDER BY timeCreated DESC', [type])
            return super.generateArray(rows.length, rows.item).map(({ id, timeCreated, calculatorType, data, name, latitude, longitude }) =>
                new Calculator(id, name, calculatorType, JSON.parse(data), timeCreated, latitude, longitude))
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to get calculator list', err)
        }
    }

    async delete(id) {
        try {
            return await this.runSingleQueryTransaction('DELETE FROM calculators WHERE id=?', [id])
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to delete calculator', err)
        }
    }

    async deleteAll(type) {
        try {
            return await this.runSingleQueryTransaction('DELETE FROM calculators WHERE calculatorType=?', [type])
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to delete calculators', err)
        }
    }

    async getById(id) {
        try {
            const { rows } = await this.runSingleQueryTransaction('SELECT id, timeCreated, calculatorType, data, name, latitude, longitude FROM calculators WHERE id=?', [id])
            const { timeCreated, calculatorType, data, name, latitude, longitude } = rows.item(0)
            return new Calculator(id, name, calculatorType, JSON.parse(data), timeCreated, latitude, longitude)
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to get calculator', err)
        }
    }

}
