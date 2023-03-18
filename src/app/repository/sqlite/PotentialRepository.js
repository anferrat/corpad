import { SQLiteRepository } from "../../utils/SQLite"
import { Error } from "../../utils/Error"
import { Potential } from "../../entities/survey/subitems/Potential"

export class PotentialRepository extends SQLiteRepository {
    constructor () {
        super()
        this.tableName = 'potentials'
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName}`, [])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, value, cardId, type, permanentReferenceId, portableReferenceId }) => {
                    const isPortable = permanentReferenceId === null
                    const refCellId = isPortable ? portableReferenceId : permanentReferenceId
                    return new Potential(id, uid, cardId, value, type, refCellId, isPortable)
                })
        }
        catch (err) {
            throw new Error('DatabaseError', 'Unable to get all potentials', err)
        }
    }

    async getBySubitemId(subitemId) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT *, potentials.id AS potentialId from ${this.tableName} 
                INNER JOIN potentialTypes ON potentialTypes.id = potentials.type
                WHERE potentials.cardId=? 
                ORDER BY potentials.permanentReferenceId, potentials.portableReferenceId, potentialTypes.id`, [subitemId])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ potentialId, uid, value, cardId, type, permanentReferenceId, portableReferenceId }) => {
                    const isPortable = permanentReferenceId === null
                    const refCellId = isPortable ? portableReferenceId : permanentReferenceId
                    return new Potential(potentialId, uid, cardId, value, type, refCellId, isPortable)
                })
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to get potentials of subitem with id ${subitemId}`, er)
        }
    }

    async create(potential) {
        const { uid, referenceCellId, isPortableReference, potentialType, subitemId, value } = potential
        try {
            const refField = isPortableReference ? 'portableReferenceId' : 'permanentReferenceid'
            const result = await super.runSingleQueryTransaction(`INSERT INTO ${this.tableName} (uid, cardId, type, ${refField}, value) VALUES (?,?,?,?,?)`,
                [uid, subitemId, potentialType, referenceCellId, value])
            return new Potential(result.insertId, uid, subitemId, value, potentialType, referenceCellId, isPortableReference)
        }
        catch (er) {
            throw new Error('DatabseError', `Unable to create potential with ${isPortableReference ? '' : 'non-'}portable referenceCellId ${referenceCellId}, potentialType with id ${potentialTypeId} for subitem with id ${subitemId} and value ${value}`, er)
        }
    }

    async update(potential, currentTime) {
        const { id, value, subitemId } = potential
        try {
            const result = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `UPDATE potentials SET value = ? WHERE id = ?`, [value, id]),
                this.runQuery(tx, 'UPDATE testPoints SET timeModified =? WHERE id IN (SELECT testPointId FROM cards WHERE id=?)', [currentTime, subitemId])
            ])
            if (result[0].rowsAffeted === 0)
                throw 'Potential was not updated'
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to update poetntial with id ${id} and value ${value}`, er)
        }
    }

    async updateList(potentials, subitemId) {
        try {
            await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `DELETE FROM potentials WHERE cardId = ? `, [subitemId]),
                potentials.length > 0 ? this.runQuery(tx,
                    `INSERT INTO potentials (id, uid, cardId, type, portableReferenceId, permanentReferenceid, value) 
                                VALUES ${potentials.map(({ id, uid, subitemId, potentialType, referenceCellId, value, isPortableReference }) =>
                        `(${id}, "${uid}", ${subitemId}, ${potentialType}, ${isPortableReference ? referenceCellId : null}, ${!isPortableReference ? referenceCellId : null}, ${value})`).join(', ')} `) : null
            ])
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to update potential list`, er)
        }
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM potentials WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Test point doesn't exist` // No Error if item not found seems logical
        }
        catch (er) {
            new Error('DatabaseError', `Unable to delete potential with id ${id}`)
        }
    }
}
