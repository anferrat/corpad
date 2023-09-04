import { SQLiteRepository } from "../../utils/SQLite"
import { Error, errors } from "../../utils/Error"
import { Potential } from "../../entities/survey/subitems/Potential"

export class PotentialRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'potentials'
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName}`, [])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, value, cardId, type, permanentReferenceId, portableReferenceId, oldValue }) => {
                    const isPortable = permanentReferenceId === null
                    const refCellId = isPortable ? portableReferenceId : permanentReferenceId
                    return new Potential(id, uid, cardId, value, type, refCellId, isPortable, oldValue)
                })
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to get all potentials', err)
        }
    }

    async getBySubitemId(subitemId) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT potentials.id, potentials.uid, potentials.value, potentials.cardId, potentials.type, potentials.permanentReferenceId, potentials.portableReferenceId, potentials.oldValue from ${this.tableName} 
                INNER JOIN potentialTypes ON potentialTypes.id = potentials.type
                WHERE potentials.cardId=? 
                ORDER BY potentials.permanentReferenceId, potentials.portableReferenceId, potentialTypes.id`, [subitemId])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, value, cardId, type, permanentReferenceId, portableReferenceId, oldValue }) => {
                    const isPortable = permanentReferenceId === null
                    const refCellId = isPortable ? portableReferenceId : permanentReferenceId
                    return new Potential(id, uid, cardId, value, type, refCellId, isPortable, oldValue)
                })
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to get potentials of subitem with id ${subitemId}`, er)
        }
    }

    async create(potential) {
        try {
            const { id, uid, referenceCellId, isPortableReference, potentialType, subitemId, value, prevValue } = potential
            const refField = isPortableReference ? 'portableReferenceId' : 'permanentReferenceid'
            const result = await super.runSingleQueryTransaction(`INSERT INTO ${this.tableName} (id, uid, cardId, type, ${refField}, value, oldValue) VALUES (?,?,?,?,?,?,?)`,
                [id, uid, subitemId, potentialType, referenceCellId, value, prevValue])
            return new Potential(result.insertId, uid, subitemId, value, potentialType, referenceCellId, isPortableReference, prevValue)
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to create potential with ${isPortableReference ? '' : 'non-'}portable referenceCellId ${referenceCellId}, potentialType with id ${potentialTypeId} for subitem with id ${subitemId} and value ${value}`, er)
        }
    }

    async update(potential, currentTime) {
        const { id, value } = potential
        try {
            const result = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `UPDATE potentials SET value = ? WHERE id = ?`, [value, id]),
                this.runQuery(tx, 'UPDATE testPoints SET timeModified =? WHERE id IN (SELECT testPointId FROM cards WHERE id IN (SELECT cardId FROM potentials WHERE id = ? ))', [currentTime, id])
            ])
            if (result[0].rowsAffected === 0)
                throw 'Potential was not updated'
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update poetntial with id ${id} and value ${value}`, er)
        }
    }

    async updateList(potentials, subitemId) {
        try {
            const [onDelete, onInsert, onSelect] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `DELETE FROM potentials WHERE cardId = ? `, [subitemId]),
                potentials.length > 0 ? this.runQuery(tx,
                    `INSERT INTO potentials (id, uid, cardId, type, portableReferenceId, permanentReferenceid, value, oldValue) 
                                VALUES ${potentials.map(({ id, uid, subitemId, potentialType, referenceCellId, value, isPortableReference, prevValue }) =>
                        `(${id}, "${uid}", ${subitemId}, ${potentialType}, ${isPortableReference ? referenceCellId : null}, ${!isPortableReference ? referenceCellId : null}, ${value}, ${prevValue})`).join(', ')} `) : null,
                this.runQuery(tx, `SELECT potentials.id, potentials.uid, potentials.value, potentials.type, potentials.permanentReferenceId, potentials.portableReferenceId, potentials.oldValue FROM potentials 
            INNER JOIN potentialTypes ON potentialTypes.id = potentials.type
            WHERE potentials.cardId=? 
            ORDER BY potentials.permanentReferenceId, potentials.portableReferenceId, potentialTypes.id`, [subitemId])
            ])
            return super.generateArray(onSelect.rows.length, onSelect.rows.item)
                .map(({ id, uid, value, cardId, type, permanentReferenceId, portableReferenceId, oldValue }) => {
                    const isPortable = permanentReferenceId === null
                    const refCellId = isPortable ? portableReferenceId : permanentReferenceId
                    return new Potential(id, uid, cardId, value, type, refCellId, isPortable, oldValue)
                })
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to update potential list`, er)
        }
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM potentials WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Test point doesn't exist` // No Error if item not found seems logical
        }
        catch (er) {
            new Error(errors.DATABASE, `Unable to delete potential with id ${id}`, er)
        }
    }
}
