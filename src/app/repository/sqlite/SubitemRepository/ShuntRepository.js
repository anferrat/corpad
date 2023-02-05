import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Error } from "../../../utils/Error"
import { Shunt } from "../../../entities/survey/subitems/Shunt"
import { SubitemResponseProcessor } from "../utils/SubitemResponseProcessor"


export class ShuntRepository extends SQLiteRepository {
    constructor() {
        super()
        this.responseProcessor = new SubitemResponseProcessor()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction(`SELECT cards.id, cards.testPointId, cards.uid, cards.name, cards.fromAtoB, cards.current, cards.ratioCurrent, cards.ratioVoltage, cards.factorSelected, cards.factor, cards.voltageDrop, sides.sideAId, sides.sideBId FROM cards LEFT JOIN sides ON cards.id = sides.parentCardId WHERE cards.type = ? ORDER BY cards.id`, [SubitemTypes.SHUNT])
            this.responseProcessor.generateArrayWithSides(result.rows.length, result.rows.item)
                .map(({ id, testPointId, uid, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop }) =>
                    new Shunt(id, testPointId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get all shunts`, err)
        }
    }

    async create(shunt) {
        const { uid, parentId, type, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, sideA, sideB } = shunt
        try {
            const sides = sideA.map(side => ({ sideA: side, sideB: null })).concat(sideB.map(side => ({ sideB: side, sideA: null })))
            const result = await super.runSingleQueryTransaction(`INSERT INTO cards (uid, testPointId, type, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                [uid, parentId, type, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop])
            if (sides.length > 0)
                this.runSingleQueryTransaction(`INSERT INTO sides (sideAId, sideBId, parentCardId) VALUES ${sides.map(side => `(${side.sideA}, ${side.sideB}, ${id})`).join()}`)
            return new Shunt(result.insertId, parentId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to create shunt`, err)
        }
    }

    async getById(id) {
        try {
            const [result, sideAresult, sideBresult] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `SELECT testPointId, uid, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop FROM cards WHERE id = ? AND type = ?`, [id, SubitemTypes.SHUNT]),
                this.runQuery(tx, `SELECT * FROM sides WHERE parentCardId = ? AND sideAId IS NOT NULL`, [id]),
                this.runQuery(tx, `SELECT * FROM sides WHERE parentCardId = ? AND sideBId IS NOT NULL`, [id])
            ])
            const sideA = this.generateArray(sideAresult.rows.length, sideAresult.rows.item).map(side => side.sideAId)
            const sideB = this.generateArray(sideBresult.rows.length, sideBresult.rows.item).map(side => side.sideBId)
            const { testPointId, uid, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop } = result.rows.item(0)

            return new Shunt(id, testPointId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB)
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get shunt with id ${id}`, err)
        }
    }

    async update(shunt) {
        const { id, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, sideA, sideB } = shunt
        try {
            const sides = sideA.map(side => ({ sideA: side, sideB: null })).concat(sideB.map(side => ({ sideB: side, sideA: null })))
            const [result] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `UPDATE cards SET name=?, fromAtoB=?, current=?, ratioCurrent=?, ratioVoltage=?, factorSelected=?, factor=?, voltageDrop=? WHERE id=?`, [name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, id]),
                this.runQuery(tx, `DELETE * FROM sides WHERE parentCardId = ?`, [id]),
                sides.lenght > 0 ? this.runQuery(tx, `INSERT INTO sides (sideAId, sideBId, parentCardId) VALUES ${sides.map(side => `(${side.sideA}, ${side.sideB}, ${id})`).join()}`) : null
            ])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return shunt
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update shunt with id ${id}`, err)
        }
    }

}