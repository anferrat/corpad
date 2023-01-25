import { SQLiteRepository } from "../../utils/SQLite"
import { Error } from "../../utils/Error"
import { Potential } from "../../entities/survey/subitems/Potential"

export class PotentialRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'potentials'
    }

    async getAll(subitemId) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName} WHERE cardId=?`, [subitemId])
            super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, value, cardId, type, permanentReferenceId, portableReferenceId }) => {
                    const isPortable = permanentReferenceId === null
                    const refCellId = isPortable ? portableReferenceId : permanentReferenceId
                    return new Potential(id, uid, cardId, value, type, refCellId, isPortable)
                })
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to get potentials of subitem with id ${subitemId}`, er)
        }
    }

    async create(uid, referenceCellId, isPortableReference, potentialTypeId, subitemId) {
        try {
            const refField = isPortableReference ? 'portableReferenceId' : 'permanentReferenceid'
            const result = await super.runSingleQueryTransaction(`INSERT INTO ${this.tableName} (uid, cardId, type, ${refField}) VALUES (?,?,?,?)`,
                [uid, subitemId, potentialTypeId, referenceCellId])
            return new Potential(result.insertId, uid, subitemId, null, potentialTypeId, referenceCellId, isPortableReference)
        }
        catch (er) {
            throw new Error('DatabseError', `Unable to create potential with ${isPortableReference ? '' : 'non-'}portable referenceCellId ${referenceCellId}, potentialType with id ${potentialTypeId} for subitem with id ${subitemId} `, er)
        }
    }

    async update(potentialId, value) {
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE ${this.tableName} SET value = ? WHERE id = ?`, [value, potentialId])
            if (result.rowsAffeted === 0)
                throw 'Potential was not updated'
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to update poetntial with id ${potentialId} and value ${value}`, er)
        }
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${this.tableName} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Test point doesn't exist` // No Error if item not found seems logical
        }
        catch (er) {
            new Error('DatabaseError', `Unable to delete potential with id ${id}`)
        }
    }
}
