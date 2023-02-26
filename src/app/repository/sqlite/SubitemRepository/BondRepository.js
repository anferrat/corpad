import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Bond } from "../../../entities/survey/subitems/Bond"
import { Error } from "../../../utils/Error"
import { SubitemResponseProcessor } from "../utils/SubitemResponseProcessor"


export class BondRepository extends SQLiteRepository {
    constructor () {
        super()
        this.responseProcessor = new SubitemResponseProcessor()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction(`SELECT cards.id, cards.testPointId, cards.uid, cards.name, cards.fromAtoB, sides.sideAId, sides.sideBId, cards.current FROM cards LEFT JOIN sides ON cards.id = sides.parentCardId WHERE cards.type = ? ORDER BY cards.id`, [SubitemTypes.BOND])
            return this.responseProcessor.generateArrayWithSides(result.rows.length, result.rows.item).map(
                ({ id, testPointId, uid, name, fromAtoB, current, sideA, sideB }) =>
                    new Bond(id, testPointId, uid, name, fromAtoB, current, sideA, sideB))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get all bonds`, err)
        }
    }

    async create(bond) {
        const { uid, parentId, name, type, fromAtoB, current, sideA, sideB } = bond
        try {
            const sides = sideA.map(side => ({ sideA: side, sideB: null })).concat(sideB.map(side => ({ sideB: side, sideA: null })))
            const result = await super.runSingleQueryTransaction(`INSERT INTO cards (uid, testPointId, type,  name, fromAtoB, current) VALUES (?,?,?,?,?,?)`,
                [uid, parentId, type, name, fromAtoB, current])
            if (sides.length > 0)
                await super.runSingleQueryTransaction(`INSERT INTO sides (sideAId, sideBId, parentCardId) VALUES ${sides.map(side => `(${side.sideA}, ${side.sideB}, ${result.insertId})`).join()}`)
            return new Bond(result.insertId, parentId, uid, name, fromAtoB, current, sideA, sideB)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to create bond`, err)
        }
    }

    async getById(id) {
        try {
            const [result, sideAresult, sideBresult] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `SELECT testPointId, uid, name, fromAtoB, current FROM cards WHERE id = ? AND type = ?`, [id, SubitemTypes.BOND]),
                this.runQuery(tx, `SELECT * FROM sides WHERE parentCardId = ? AND sideAId IS NOT NULL`, [id]),
                this.runQuery(tx, `SELECT * FROM sides WHERE parentCardId = ? AND sideBId IS NOT NULL`, [id])
            ])
            const sideA = this.generateArray(sideAresult.rows.length, sideAresult.rows.item).map(side => side.sideAId)
            const sideB = this.generateArray(sideBresult.rows.length, sideBresult.rows.item).map(side => side.sideBId)
            const { testPointId, uid, name, fromAtoB, current } = result.rows.item(0)

            return new Bond(id, testPointId, uid, name, fromAtoB, current, sideA, sideB)
        }
        catch (err) {
            throw new Error(`DatabaseError`, `Unable to get bond with id ${id}`, err)
        }
    }

    async update(bond, currentTime) {
        const { id, name, fromAtoB, current, parentId, sideA, sideB } = bond
        try {
            const sides = sideA.map(side => ({ sideA: side, sideB: null })).concat(sideB.map(side => ({ sideB: side, sideA: null })))
            const [result] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `UPDATE cards SET name=?, fromAtoB=?, current=? WHERE id=?`, [name, fromAtoB, current, id]),
                this.runQuery(tx, `UPDATE testPoints SET timeModified=? WHERE id =?`, [currentTime, parentId]),
                this.runQuery(tx, `DELETE FROM sides WHERE parentCardId = ?`, [id]),
                sides.length > 0 ? this.runQuery(tx, `INSERT INTO sides (sideAId, sideBId, parentCardId) VALUES ${sides.map(side => `(${side.sideA}, ${side.sideB}, ${id})`).join()}`) : null
            ])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return bond
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update bond with id ${id}`, err)
        }
    }
}