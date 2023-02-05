import { SQLiteRepository } from "../../utils/SQLite"
import { Error } from "../../utils/Error"
import { Potential } from "../../entities/survey/subitems/Potential"

export class PotentialRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'potentials'
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName}`, [])
            super.generateArray(result.rows.length, result.rows.item)
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

    async getByItemId({ idList, permTypes }) {
        //returns all potentails of selected permTypes and activeReference
        try {
            const permTypeCondition = permTypes.length > 0 ? `AND potentialTypes.permType IN ${super.convertArrayToInStatement(permTypes)}` : ''
            const result = await super.runSingleQueryTransaction(
            `SELECT potentials.* 
            FROM potentials 
            LEFT JOIN cards ON 
            potentials.cardId = cards.id 
            LEFT JOIN testPoints ON 
            cards.testPointId = testPoints.id
            INNER JOIN potentialTypes ON 
            potentials.type = potentialTypes.id 
            INNER JOIN referenceCells ON 
            potentials.portableReferenceId = referenceCells.id
            WHERE testPoints.id IN ${super.convertArrayToInStatement(idList)}
            ${permTypeCondition} AND
            referenceCells.mainReference = 1`)
            return super.generateArray(result.rows.length, result.rows.item)
            .map(({ id, uid, value, cardId, type, permanentReferenceId, portableReferenceId }) => {
                const isPortable = permanentReferenceId === null
                const refCellId = isPortable ? portableReferenceId : permanentReferenceId
                return new Potential(id, uid, cardId, value, type, refCellId, isPortable)
            })
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get potentials for test points`, err)
        }
    }

    async create(potential) {
        const { uid, referenceCellId, isPortableReference, potentialTypeId, subitemId, value } = potential
        try {
            const refField = isPortableReference ? 'portableReferenceId' : 'permanentReferenceid'
            const result = await super.runSingleQueryTransaction(`INSERT INTO ${this.tableName} (uid, cardId, type, ${refField}, value) VALUES (?,?,?,?,?)`,
                [uid, subitemId, potentialTypeId, referenceCellId, value])
            return new Potential(result.insertId, uid, subitemId, value, potentialTypeId, referenceCellId, isPortableReference)
        }
        catch (er) {
            throw new Error('DatabseError', `Unable to create potential with ${isPortableReference ? '' : 'non-'}portable referenceCellId ${referenceCellId}, potentialType with id ${potentialTypeId} for subitem with id ${subitemId} and value ${value}`, er)
        }
    }

    async update(potential) {
        const { id, value } = potential
        try {
            const result = await super.runSingleQueryTransaction(`UPDATE ${this.tableName} SET value = ? WHERE id = ?`, [value, id])
            if (result.rowsAffeted === 0)
                throw 'Potential was not updated'
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to update poetntial with id ${id} and value ${value}`, er)
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
