import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"
import { Shunt } from "../../../entities/survey/subitems/Shunt"
import { SubitemResponseProcessor } from "../utils/SubitemResponseProcessor"


export class ShuntRepository extends SQLiteRepository {
    constructor() {
        super()
        this.responseProcessor = new SubitemResponseProcessor()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction(`SELECT cards.id, cards.testPointId, cards.uid, cards.name, cards.fromAtoB, cards.current, cards.ratioCurrent, cards.ratioVoltage, cards.factorSelected, cards.factor, cards.voltageDrop, cards.oldVoltageDrop, sides.sideAId, sides.sideBId FROM cards LEFT JOIN sides ON cards.id = sides.parentCardId WHERE cards.type = ? ORDER BY cards.id`, [SubitemTypes.SHUNT])
            return this.responseProcessor.generateSubitemDataArray(result.rows.length, result.rows.item)
                .map(({ id, testPointId, uid, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, sideA, sideB, oldVoltageDrop }) =>
                    new Shunt(id, testPointId, uid, name, factor, ratioVoltage, ratioCurrent, Boolean(factorSelected), current, voltageDrop, fromAtoB, sideA, sideB, oldVoltageDrop))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get all shunts`, err)
        }
    }

    async create(shunt) {
        try {
            const { id, uid, parentId, type, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, sideA, sideB, prevVoltageDrop } = shunt
            const sides = sideA.map(side => ({ sideA: side, sideB: null })).concat(sideB.map(side => ({ sideB: side, sideA: null })))
            const result = await super.runSingleQueryTransaction(`INSERT INTO cards (id, uid, testPointId, type, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, oldVoltageDrop) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [id, uid, parentId, type, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, prevVoltageDrop])
            if (sides.length > 0)
                this.runSingleQueryTransaction(`INSERT INTO sides (sideAId, sideBId, parentCardId) VALUES ${sides.map(side => `(${side.sideA}, ${side.sideB}, ${result.insertId})`).join()}`)
            return new Shunt(result.insertId, parentId, uid, name, factor, ratioVoltage, ratioCurrent, factorSelected, current, voltageDrop, fromAtoB, sideA, sideB, prevVoltageDrop)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to create shunt`, err)
        }
    }

    async getById(id) {
        try {
            const [result, sideAresult, sideBresult] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `SELECT testPointId, uid, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, oldVoltageDrop FROM cards WHERE id = ? AND type = ?`, [id, SubitemTypes.SHUNT]),
                this.runQuery(tx, `SELECT * FROM sides WHERE parentCardId = ? AND sideAId IS NOT NULL`, [id]),
                this.runQuery(tx, `SELECT * FROM sides WHERE parentCardId = ? AND sideBId IS NOT NULL`, [id])
            ])
            const sideA = this.generateArray(sideAresult.rows.length, sideAresult.rows.item).map(side => side.sideAId)
            const sideB = this.generateArray(sideBresult.rows.length, sideBresult.rows.item).map(side => side.sideBId)

            const { testPointId, uid, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, oldVoltageDrop } = result.rows.item(0)

            return new Shunt(id, testPointId, uid, name, factor, ratioVoltage, ratioCurrent, Boolean(factorSelected), current, voltageDrop, fromAtoB, sideA, sideB, oldVoltageDrop)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get shunt with id ${id}`, err)
        }
    }

    async update(shunt, currentTime) {
        const { id, parentId, name, fromAtoB, current, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, sideA, sideB } = shunt
        try {
            const sides = sideA.map(side => ({ sideA: side, sideB: null })).concat(sideB.map(side => ({ sideB: side, sideA: null })))
            const [result] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `UPDATE cards SET name=?, fromAtoB=?, current=?, ratioCurrent=?, ratioVoltage=?, factorSelected=?, factor=?, voltageDrop=? WHERE id=?`, [name, fromAtoB, current, ratioCurrent, ratioVoltage, Number(factorSelected), factor, voltageDrop, id]),
                this.runQuery(tx, 'UPDATE testPoints SET timeModified = ? WHERE id=?', [currentTime, parentId]),
                this.runQuery(tx, `DELETE FROM sides WHERE parentCardId = ?`, [id]),
                sides.length > 0 ? this.runQuery(tx, `INSERT INTO sides (sideAId, sideBId, parentCardId) VALUES ${sides.map(side => `(${side.sideA}, ${side.sideB}, ${id})`).join()}`) : null
            ])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return shunt
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to update shunt with id ${id}`, err)
        }
    }

}