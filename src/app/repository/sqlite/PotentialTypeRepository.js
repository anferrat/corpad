import { SQLiteRepository } from "../../utils/SQLite"
import { PotentialType } from "../../entities/survey/other/PotentialType"
import { Error } from "../../utils/Error"

export class PotentialTypeRepository extends SQLiteRepository {
    constructor () {
        super()
        this.tableName = 'potentialTypes'
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from potentialTypes`)
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, name, permType }) =>
                    new PotentialType(id, uid, name, permType)
                )
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to get potential types`, er)
        }
    }

    async create(potentialType) {
        const { uid, name, permType } = potentialType
        try {
            const result = await super.runSingleQueryTransaction(`INSERT INTO ${this.tableName} (uid, name, permType, custom) VALUES (?,?,?,?)`,
                [uid, name, permType, !permType])
            return new PotentialType(result.insertId, uid, name, permType)
        }
        catch (er) {
            throw new Error('DatabseError', `Unable to create potentialType with uid ${uid} and name ${name} and permType ${permType}`, er)
        }
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${this.tableName} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Test point doesn't exist` // No Error if item not found seems logical
        }
        catch (er) {
            new Error('DatabaseError', `Unable to delete potential type with id ${id}`)
        }
    }
}
