import { SQLiteRepository } from "../../utils/SQLite"
import { ReferenceCell } from "../../entities/survey/other/ReferenceCell"
import { Error, errors } from "../../utils/Error"
import { SubitemTypes } from "../../entities/survey/subitems/Subitem"
import { StatReferenceCell } from "../../entities/survey/subitems/StatReferenceCell"

export class ReferenceCellRepository extends SQLiteRepository {
    constructor () {
        super()
        this.tableName = 'referenceCells'
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName}`, [])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, rcType, name, mainReference }) => new ReferenceCell(id, uid, rcType, name, Boolean(mainReference)))
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to get list of reference cells.', err)
        }
    }

    async getAllForItem(itemId, subitemId) {
        //Returns full list of portable reference cells plus stationary reference cells within test point excluding given subitemId in case of RE type ( no self reference )
        try {
            const result = await super.runSingleQueryTransaction('SELECT id, uid, rcType, name, mainReference, 1 AS isPortable from referenceCells UNION ALL SELECT id, uid, rcType, name, 0 AS mainReference, 0 AS isPortable FROM cards WHERE testPointId = ? AND type = ? AND id <> ?',
                [itemId, SubitemTypes.REFERENCE_CELL, subitemId])
            return this.generateArray(result.rows.length, result.rows.item).map(({ id, uid, rcType, name, mainReference, isPortable }) =>
                isPortable ?
                    new ReferenceCell(id, uid, rcType, name, mainReference) :
                    new StatReferenceCell(id, itemId, uid, name, rcType, null, null))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get reference cell list for subitem`, err)
        }
    }

    async create(referenceCell) {
        const { id, rcType, name, uid, isMainReference } = referenceCell
        try {
            const result = await super.runSingleQueryTransaction(
                `INSERT INTO ${this.tableName} (id, uid, mainReference, rcType, name) VALUES (?,?,?,?,?)`,
                [id, uid, isMainReference, rcType, name])
            return new ReferenceCell(result.insertId, uid, rcType, name, isMainReference)
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to create reference cell.', err)
        }
    }

    async getMainReference() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName} WHERE mainReference=1 LIMIT 1`, [])
            const row = result.rows.item(0)
            return new ReferenceCell(row.id, row.uid, row.rcType, row.name, Boolean(row.mainReference))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get main reference cell.`, err)
        }
    }

    async getReferenceCellById(id) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName} WHERE id=? LIMIT 1`, [id])
            const row = result.rows.item(0)
            return new ReferenceCell(row.id, row.uid, row.rcType, row.name, Boolean(row.mainReference))
        }
        catch (er) {
            throw new Error(errors.DATABASE, `Unable to get reference cell with id ${id}`, er)
        }
    }

    async updateMainReference(id) {
        try {
            await super.runMultiQueryTransaction((tx) => [
                super.runQuery(tx, `UPDATE ${this.tableName} SET mainReference=0 WHERE mainReference=1`, []),
                super.runQuery(tx, `UPDATE ${this.tableName} SET mainReference=1 WHERE id=?`, [id])
            ])
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to update main reference with id ${id}`, err)
        }
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction('DELETE FROM referenceCells WHERE id=?', [id])
            if (result.rowsAffected === 0)
                return //throw `Refernce cell doesn't exist`
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to delete reference cell with id ${id}`, err)
        }
    }
}
