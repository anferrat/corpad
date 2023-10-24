import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"
import { SoilResistivityLayer } from "../../../entities/survey/subitems/SoilResistivityLayer"
import { SoilResistivity } from "../../../entities/survey/subitems/SoilResistivity"

export class SoilResistivityRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    _generateSoilResistivityArray(length, item) {
        let result = []
        let savedValue
        for (i = 0; i < length; i++) {
            let value = item(i)
            if (value?.id !== savedValue?.id) {
                if (savedValue)
                    result.push(savedValue)
                savedValue = { ...value, layers: [] }
            }
            const { id, layerId, layerUid, spacing, resistanceToNext, resistanceToZero, resistivityToNext, resistivityToZero } = value
            savedValue.layers.push(new SoilResistivityLayer(layerId, layerUid, id, spacing, resistanceToZero, resistanceToNext, resistivityToZero, resistivityToNext))
            if (i === length - 1) {
                result.push(savedValue)
            }
        }
        return result
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction(
                `SELECT cards.id, cards.testPointId, cards.uid, cards.name, cards.spacingUnit, cards.resistivityUnit, cards.description, soilResistivityLayers.id as layerId, soilResistivityLayers.uid as layerUid, soilResistivityLayers.spacing, soilResistivityLayers.resistanceToNext, soilResistivityLayers.resistanceToZero, soilResistivityLayers.resistivityToNext, soilResistivityLayers.resistivityToZero
                FROM cards 
                LEFT JOIN soilResistivityLayers ON  
                cards.id = soilResistivityLayers.parentId
                WHERE type=?
                ORDER BY cards.id, spacing`, [SubitemTypes.SOIL_RESISTIVITY])
            return this._generateSoilResistivityArray(result.rows.length, result.rows.item)
                .map(({ id, testPointId, uid, name, spacingUnit, resistivityUnit, description, layers }) =>
                    new SoilResistivity(id, testPointId, uid, name, spacingUnit, resistivityUnit, description, layers))
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to get soil resistivities', er)
        }
    }

    async create(soilResistivity) {
        //Important: layer id returned as Null for newly created layers. (At this moment layer ID is not used, only if at some point we would want to access each layer individually in future)
        const { id, uid, parentId, name, type, spacingUnit, resistivityUnit, comment, layers } = soilResistivity
        if (layers.length > 6)
            throw new Error(errors.DATABASE, 'Unable to create soil resistivity', 'Max number of layers exeeded')
        try {
            const result = await this.runSingleQueryTransaction('INSERT INTO cards (id, uid, type, testPointId, name, spacingUnit, resistivityUnit, description) VALUES (?,?,?,?,?,?,?,?)', [id, uid, type, parentId, name, spacingUnit, resistivityUnit, comment])

            if (layers.length > 0)
                this.runSingleQueryTransaction(
                    `INSERT INTO soilResistivityLayers (id, uid, parentId, spacing, resistanceToZero, resistanceToNext, resistivityToZero, resistivityToNext) VALUES 
                    ${layers.map(() => `(?, ?, ?, ?, ?, ?, ?, ?)`).join(', ')}`,
                    layers.map(layer => [layer.id, layer.uid, result.insertId, layer.spacing, layer.resistanceToZero, layer.resistanceToNext, layer.resistivityToZero, layer.resistivityToNext]).flat()
                )
            return new SoilResistivity(result.insertId, parentId, uid, name, spacingUnit, resistivityUnit, comment, layers)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to create soil resistivity`, err)
        }
    }

    async getById(soilResistivityId) {
        try {
            const [soilResistivities, layerData] = await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, 'SELECT testPointId, uid, name, spacingUnit, resistivityUnit, description FROM cards WHERE id=? AND type=?', [soilResistivityId, SubitemTypes.SOIL_RESISTIVITY]),
                this.runQuery(tx, 'SELECT id, uid, spacing, resistanceToZero, resistanceToNext, resistivityToZero, resistivityToNext FROM soilResistivityLayers WHERE parentId = ?', [soilResistivityId])
            ])
            const layers = this.generateArray(layerData.rows.length, layerData.rows.item)
                .map(({ id, uid, spacing, resistanceToZero, resistanceToNext, resistivityToZero, resistivityToNext }) =>
                    new SoilResistivityLayer(id, uid, soilResistivityId, spacing, resistanceToZero, resistanceToNext, resistivityToZero, resistivityToNext))

            const { testPointId, uid, name, spacingUnit, resistivityUnit, description } = soilResistivities.rows.item(0)
            return new SoilResistivity(soilResistivityId, testPointId, uid, name, spacingUnit, resistivityUnit, description, layers)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get soil resistivity with id ${soilResistivityId} `, err)
        }
    }

    async update(soilResistivity, currentTime) {
        const { id, name, parentId, spacingUnit, resistivityUnit, comment, layers } = soilResistivity
        if (layers.length > 6)
            throw new Error(errors.DATABASE, 'Unable to update soil resistivity', 'Max number of layers exeeded')
        try {
            const [result] = await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, 'UPDATE cards SET name=?, spacingUnit=?, resistivityUnit=?, description=? WHERE id=?', [name, spacingUnit, resistivityUnit, comment, id]),
                this.runQuery(tx, 'UPDATE testPoints SET timeModified=? WHERE id = ?', [currentTime, parentId]),
                this.runQuery(tx, 'DELETE FROM soilResistivityLayers WHERE parentId=?', [id]),
                layers.length > 0 ? this.runQuery(tx, `INSERT INTO soilResistivityLayers (uid, parentId, spacing, resistanceToZero, resistanceToNext, resistivityToZero, resistivityToNext) VALUES 
                ${layers.map(() => `(?, ?, ?, ?, ?, ?, ?)`).join(', ')}`,
                    layers.map(layer => [layer.uid, id, layer.spacing, layer.resistanceToZero, layer.resistanceToNext, layer.resistivityToZero, layer.resistivityToNext]).flat()
                ) : null
            ])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return soilResistivity
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to update soil resistivity with id ${id} `, err)
        }
    }
}