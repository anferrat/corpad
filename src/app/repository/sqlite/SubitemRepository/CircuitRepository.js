import { SQLiteRepository } from "../../../utils/SQLite"
import { Circuit } from "../../../entities/survey/subitems/Circuit"
import { Error } from "../../../utils/Error"


export class CircuitRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT id, rectifierId, uid, name, ratioCurrent, ratioVoltage, current, voltage, targetMin, targetMax FROM circuits')
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, rectifierId, uid, name, ratioCurrent, ratioVoltage, current, voltage, targetMin, targetMax }) =>
                    new Circuit(id, rectifierId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage))
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get all circuits`, err)
        }
    }

    async create(circuit) {
        const { uid, parentId, name, ratioCurrent, ratioVoltage, current, voltage, targetMin, targetMax } = circuit
        try {
            const result = await this.runSingleQueryTransaction('INSERT INTO circuits (uid, rectifierId, name, ratioCurrent, ratioVoltage, current, voltage, targetMin, targetMax) VALUES (?,?,?,?,?,?,?,?,?)',
                [uid, parentId, name, ratioCurrent, ratioVoltage, current, voltage, targetMin, targetMax])
            return new Circuit(result.insertId, parentId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to create circuit`, err)
        }
    }

    async getById(id) {
        try {
            const result = await this.runSingleQueryTransaction('SELECT rectifierId, uid, name, ratioCurrent, ratioVoltage, current, voltage, targetMin, targetMax FROM circuits WHERE id=?', [id])
            const { rectifierId, uid, name, ratioCurrent, ratioVoltage, current, voltage, targetMin, targetMax } = result.rows.item(0)
            return new Circuit(id, rectifierId, uid, name, ratioCurrent, ratioVoltage, targetMin, targetMax, current, voltage)
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get circuit with id ${id}`, err)
        }
    }

    async update(circuit) {
        const { id, name, ratioCurrent, ratioVoltage, current, voltage, targetMin, targetMax } = circuit
        try {
            const result = await this.runSingleQueryTransaction('UPDATE circuits SET name=?, ratioCurrent=?, ratioVoltage=?, current=?, voltage=?, targetMin=?, targetMax=? WHERE id=?', [name, ratioCurrent, ratioVoltage, current, voltage, targetMin, targetMax, id])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return circuit
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update circuit with id ${id}`, err)
        }
    }

}