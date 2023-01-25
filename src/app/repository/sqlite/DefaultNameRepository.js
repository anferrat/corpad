import { SQLiteRepository } from "../../utils/SQLite"
import { Error } from "../../utils/Error"

export class DefaultNameRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'defaultNames'
    }

    async updateAll(defaultNames) {
        try {
            await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, 'DELETE * from defaultNames'),
                ...Object.keys(defaultNames).map(key => this.runQuery(tx, `INSERT INTO ${this.tableName} (type, name) VALUES (??) `, [key, defaultNames[key]]))
            ])
        }
        catch (err) {
            throw new Error('DatabaseError', 'Unable to reset default name values')
        }
    }

    async getByType(type) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT name from defaultNames WHERE type = ? LIMIT 1`,
                [type]
            )
            return result.rows.item(0).name
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get default name fro type ${type}`, err)
        }
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT * from defaultNames`, [])
            return this.generateArray(result.rows.length, result.rows.item)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get default name fro type ${type}`, err)
        }
    }
}
