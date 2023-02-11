import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Isolation } from "../../../entities/survey/subitems/Isolation"
import { Error } from "../../../utils/Error"
import { SubitemResponseProcessor } from "../utils/SubitemResponseProcessor"


export class IsolationRepository extends SQLiteRepository {
    constructor () {
        super()
        this.responseProcessor = new SubitemResponseProcessor()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction(`SELECT cards.id, cards.testPointId, cards.uid, cards.name, cards.fromAtoB, cards.shorted, cards.isolationType, sides.sideAId, sides.sideBId, cards.current FROM cards LEFT JOIN sides ON cards.id = sides.parentCardId WHERE cards.type = ? ORDER BY cards.id`, [SubitemTypes.ISOLATION])
            return this.responseProcessor.generateArrayWithSides(result.rows.length, result.rows.item)
                .map(({ id, uid, testPointId, name, fromAtoB, current, isolationType, shorted, sideA, sideB }) =>
                    new Isolation(id, testPointId, uid, name, fromAtoB, isolationType, Boolean(shorted), current, sideA, sideB))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get all isolation readings`, err)
        }
    }

    async create(isolation) {
        const { uid, parentId, type, name, fromAtoB, current, isolationType, shorted, sideA, sideB } = isolation
        try {
            const sides = sideA.map(side => ({ sideA: side, sideB: null })).concat(sideB.map(side => ({ sideB: side, sideA: null })))
            const result = await super.runSingleQueryTransaction(`INSERT INTO cards (uid, testPointId, type, name, fromAtoB, current, isolationType, shorted) VALUES (?,?,?,?,?,?,?,?)`,
                [uid, parentId, type, name, fromAtoB, current, isolationType, shorted])
            if (sides.length > 0)
                super.runSingleQueryTransaction(`INSERT INTO sides (sideAId, sideBId, parentCardId) VALUES ${sides.map(side => `(${side.sideA}, ${side.sideB}, ${result.insertId})`).join()}`)
            return new Isolation(result.insertId, parentId, uid, name, fromAtoB, isolationType, Boolean(shorted), current, sideA, sideB)
        }
        catch (err) {
            console.log(err)
            throw new Error('DatabaseError', `Unable to create isolation reading`, err)
        }
    }

    async getById(id) {
        try {
            const [result, sideAresult, sideBresult] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `SELECT testPointId, uid, name, fromAtoB, current, isolationType, shorted FROM cards WHERE id = ? AND type = ?`, [id, SubitemTypes.ISOLATION]),
                this.runQuery(tx, `SELECT * FROM sides WHERE parentCardId = ? AND sideAId IS NOT NULL`, [id]),
                this.runQuery(tx, `SELECT * FROM sides WHERE parentCardId = ? AND sideBId IS NOT NULL`, [id])
            ])
            const sideA = this.generateArray(sideAresult.rows.length, sideAresult.rows.item).map(side => side.sideAId)
            const sideB = this.generateArray(sideBresult.rows.length, sideBresult.rows.item).map(side => side.sideBId)
            const { testPointId, uid, name, fromAtoB, current, isolationType, shorted } = result.rows.item(0)
            return new Isolation(id, testPointId, uid, name, fromAtoB, isolationType, Boolean(shorted), current, sideA, sideB)
        }
        catch (err) {
            throw new Error(`DatabaseError`, `Unable to get isolation with id ${id}`, err)
        }
    }

    async update(isolation, currentTime) {
        const { id, name, parentId, fromAtoB, current, isolationType, shorted, sideA, sideB } = isolation
        try {
            const sides = sideA.map(side => ({ sideA: side, sideB: null })).concat(sideB.map(side => ({ sideB: side, sideA: null })))
            const [result] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `UPDATE cards SET name=?, fromAtoB=?, current=?, isolationType=?, shorted=? WHERE id=?`, [name, fromAtoB, current, isolationType, shorted, id]),
                this.runQuery(tx, `UPDATE testPoints SET timeModified = ? WHERE id =?`, [currentTime, parentId]),
                this.runQuery(tx, `DELETE FROM sides WHERE parentCardId = ?`, [id]),
                sides.length > 0 ? this.runQuery(tx, `INSERT INTO sides (sideAId, sideBId, parentCardId) VALUES ${sides.map(side => `(${side.sideA}, ${side.sideB}, ${id})`).join()}`) : null
            ])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return isolation
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update isolation with id ${id}`, err)
        }
    }
}