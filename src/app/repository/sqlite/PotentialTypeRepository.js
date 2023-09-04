import { SQLiteRepository } from "../../utils/SQLite"
import { PotentialType } from "../../entities/survey/other/PotentialType"
import { Error, errors } from "../../utils/Error"

export class PotentialTypeRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'potentialTypes'
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from potentialTypes`)
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, name, permType, isAC }) =>
                    new PotentialType(id, uid, name, permType, isAC)
                )
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to get potential types`, er)
        }
    }

    async create(potentialType) {
        try {
            const { id, uid, name, type, isAc } = potentialType
            const result = await super.runSingleQueryTransaction(`INSERT INTO ${this.tableName} (id, uid, name, permType, custom, isAc) VALUES (?,?,?,?,?,?)`,
                [id, uid, name, type, Number(!type), isAc])
            return new PotentialType(result.insertId, uid, name, type, isAc)
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to create potentialType`, er)
        }
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${this.tableName} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Test point doesn't exist` // No Error if item not found seems logical
        }
        catch (er) {
            new Error(errors.DATABASE, `Unable to delete potential type with id ${id}`, er)
        }
    }
}
