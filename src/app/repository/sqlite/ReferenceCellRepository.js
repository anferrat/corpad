import { SQLiteRepository } from "../../utils/SQLite"
import { ReferenceCell } from "../../entities/survey/other/ReferenceCell"
import { guid } from "../../utils/guid"
import { Error } from "../../utils/Error"

export class ReferenceCellRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'referenceCells'
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName}`, [])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(row => new ReferenceCell(row.id, row.uid, row.rcType, row.name, Boolean(row.mainReference)))
        }
        catch (err) {
            throw new Error('DatabaseError', 'Unable to get list of reference cells.', err)
        }
    }

    async create(referenceCell) {
        try {
            const uid = guid()
            const result = await super.runSingleQueryTransaction(
                `INSERT INTO ${this.tableName} (uid, mainReference, rcType, name) VALUES (?,?,?,?)`,
                [uid, 0, referenceCell.rcType, referenceCell.name])
            return new ReferenceCell(result.insertId, uid, referenceCell.rcType, referenceCell.name, false)
        }
        catch (err) {
            throw new Error('DatabaseError', 'Unable to create reference cell.', err)
        }
    }

    async getMainReference() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName} WHERE mainReference=1 LIMIT 1`, [])
            const row = result.rows.item(0)
            return new ReferenceCell(row.id, row.uid, row.rcType, row.name, Boolean(row.mainReference))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get main reference cell.`)
        }
    }

    async getReferenceCellById(id) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName} WHERE id=? LIMIT 1`, [id])
            const row = result.rows.item(0)
            return new ReferenceCell(row.id, row.uid, row.rcType, row.name, Boolean(row.mainReference))
        }
        catch (er) {
            throw new Error('DatabaseError', `Unable to get reference cell with id ${id}`)
        }
    }

    async updateMainReference(id) {
        try {
            const [updateOld, updateNew] = await super.runMultiQueryTransaction((tx) => [
                super.runQuery(tx, `UPDATE ${this.tableName} SET mainReference=0 WHERE mainReference=1`, []),
                super.runQuery(tx, `UPDATE ${this.tableName} SET mainReference=1 WHERE id=?`, [id])
            ])
            return {
                rowsUpdated: updateOld.rowsAffected + updateNew.rowsAffected,
                mainReferenceId: id
            }
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update main reference with id ${id}`, err)
        }
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction('DELETE FROM referenceCells WHERE id=?', [id])
            if (result.rowsAffected === 0)
                return //throw `Refernce cell doesn't exist`
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to delete reference cell with id ${id}`, err)
        }
    }
}
