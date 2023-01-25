import { SQLiteRepository } from "../../utils/SQLite"
import { SubitemClasses, SubitemData } from "../../entities/survey/subitems/SubitemData"
import { ItemTypes } from "../../entities/survey/items/SurveyItem"
import { SubitemTypes } from "../../entities/survey/subitems/SubitemData"
import { DisplayCardReading } from '../../entities/survey/other/DisplayCard'
import { ItemStatuses } from "../../entities/survey/items/SurveyItem"
import { Error } from "../../utils/Error"

export class SubitemRepository extends SQLiteRepository {
    constructor() {
        super()
        this.subitemTables = ['cards', 'circuits', 'sides']
    }


    async getByIdAndType({ id, type }) {
        try {
            const subitemTable = type === SubitemTypes.CIRCUIT ? this.subitemTables[1] : this.subitemTables[0]
            const [result, sideAresult, sideBresult] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(`SELECT * FROM ${subitemTable} WHERE id = ? LIMIT 1`, [id]),
                this.runQuery(`SELECT * FROM ${this.subitemTables[2]} WHERE parentCardId = ? AND sideAId IS NOT NULL`, [id]),
                this.runQuery(`SELECT * FROM ${this.subitemTables[2]} WHERE parentCardId = ? AND sideBId IS NOT NULL`, [id])
            ])
            const { rectifierId, testpointId, uid, name, anodeMaterial, wireColor, wireGauge, fromAtoB, current, currentUnit, pipelineId, pipelineCardId, couponType, density, area, description, isolationType, shorted, rcType, nps, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, targetMin, targetMax, voltage } = result.rows.item(0)
            const parentId = rectifierId ?? testpointId
            const sideA = this.generateArray(sideAresult.rows.length, sideAresult.rows.item).map(side => side.sideAId)
            const sideB = this.generateArray(sideBresult.rows.length, sideBresult.rows.item).map(side => side.sideBId)
            return new SubitemData(id, parentId, uid, type, null, null, name, anodeMaterial, wireColor, wireGauge, fromAtoB, current, currentUnit, pipelineId, pipelineCardId, couponType, density, area, description, isolationType, shorted, rcType, nps, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, targetMin, targetMax, voltage, sideA, sideB).getSubitem()
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get subitem of type ${type} and id ${id}`, err)
        }
    }

    async create({ parentId, type, uid }) {
        try {
            const result = await super.runSingleQueryTransaction(
                type === SubitemTypes.CIRCUIT ? `INSERT INTO circuits (uid, rectifierId) VALUES (${uid},${parentId})` :
                    `INSERT INTO cards (uid, testPointId, type) VALUES (${uid},${parentId},${type})`,
                [])
            return new SubitemData(result.insertId, parentId, uid, type, null).getSubitem()
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to create subitem of type ${type} and parentId ${parentId}`, err)
        }
    }

    async delete({ id, type }) {
        try {
            const subitemTable = type === SubitemTypes.CIRCUIT ? this.subitemTables[1] : this.subitemTables[0]
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${subitemTable} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Subitem doesn't exist` // Silently fail if item not found
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to deletesubitem of type ${type} with id ${id}`, err)
        }
    }

    async update({ id, type, name, anodeMaterial, wireColor, wireGauge, fromAtoB, current, currentUnit, pipelineId, pipelineCardId, couponType, density, area, description, isolationType, shorted, rcType, nps, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, targetMin, targetMax, voltage, sideA, sideB }) {
        try {
            let result
            if (type === SubitemTypes.CIRCUIT) {
                result = (await super.runSingleQueryTransaction(
                    'UPDATE circuits SET name=?, ratioCurrent=?, ratioVoltage=?, current=?, voltage=?, targetMin=?, targetMax=? WHERE id=?',
                    [name, ratioCurrent, ratioVoltage, current, voltage, targetMin, targetMax, id])).rowsAffected
            }
            else {
                result = (await super.runSingleQueryTransaction(
                    `UPDATE cards SET name=?, anodeMaterial=?, wireColor=?, wireGauge=?, fromAtoB=?, current=?, currentUnit=?, pipelineId=?, pipelineCardId=?, couponType=?, density=?, area=?, description=?, isolationType=?, shorted=?, rcType=?, nps=?, ratioCurrent=?, factorSelected=?, factor=?, voltageDrop=? WHERE id=?`,
                    [name, anodeMaterial, wireColor, wireGauge, wireColor, fromAtoB, current, currentUnit, pipelineId, pipelineCardId, couponType, density, area, description, isolationType, shorted, rcType, nps, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop, id])).rowsAffected
                if (sideA && sideB) {
                    await this.runMultiQueryTransaction(tx => [
                        this.runQuery(tx, `DELETE * FROM ${this.subitemTables[2]} WHERE parentCardId = ?`, [id]),
                        this.runQuery(tx, `INSERT INTO ${this.subitemTables[2]} (sideAId, parentCardId) VALUES ${sideA.map(side => `(${side}, ${id}})`).join(', ')}`),
                        this.runQuery(tx, `INSERT INTO ${this.subitemTables[2]} (sideBId, parentCardId) VALUES ${sideB.map(side => `(${side}, ${id}})`).join(', ')}`)
                    ])
                }
            }
            if (result === 0) {
                throw 'Subitem not found'
            }
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update subitem of type ${type} with id ${id}`, err)
        }
    }
}
