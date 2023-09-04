import { SQLiteRepository } from "../../utils/SQLite"
import { Rectifier } from "../../entities/survey/items/Rectifier"
import { Marker } from "../../entities/survey/items/Marker"
import { Error, errors } from "../../utils/Error"
import { ItemResponseProcessor } from "./utils/ItemResponseProcessor"
import { ItemTypes, SubitemTypes } from "../../../constants/global"
import { Circuit } from "../../entities/survey/subitems/Circuit"

export class RectifierRepository extends SQLiteRepository {
    constructor() {
        super()
        this.responseProcessor = new ItemResponseProcessor()
        this.tableName = 'rectifiers'
        this.subitemTable = 'circuits'
    }

    async getIdList({ sorting, latitude, longitude }) {
        try {
            const sortingQuery = this.responseProcessor.sortingQuery(sorting, latitude, longitude)
            const result = await super.runSingleQueryTransaction(`SELECT id FROM ${this.tableName}${sortingQuery}`, [])
            return super.generateArray(result.rows.length, result.rows.item).map(row => row.id)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get rectifier id list with sorting ${sorting}`, err)
        }
    }

    async getById(idList) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName} WHERE id IN ${super.convertArrayToInStatement(idList)}`, [])
            return super.generateArray(result.rows.length, result.rows.item).map(({ id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent }) =>
                new Rectifier(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)
            )
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get rectifer with idList ${idList.join()}`, err)
        }
    }

    async create(rectifier) {
        try {
            const { id, uid, timeCreated, timeModified, name, status, location, latitude, longitude, comment, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent } = rectifier
            const result = await super.runSingleQueryTransaction(
                `INSERT INTO rectifiers (id, uid, timeCreated, status, name, location, latitude, longitude, comment, timeModified, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [id, uid, timeCreated, status, name, location, latitude, longitude, comment, timeModified, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent])
            return new Rectifier(result.insertId, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to create rectifier with name ${name}, latitude ${latitude} and longitude ${longitude}.`, err)
        }
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${this.tableName} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Rectifier doesn't exist` // Silently fail if item not found
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to delete rectifier with id ${id}`, err)
        }
    }

    async update(rectifier) {
        const { id, timeModified, status, name, location, latitude, longitude, comment, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent } = rectifier
        try {
            const result = await super.runSingleQueryTransaction(
                `UPDATE rectifiers SET name=?, status=?, latitude=?, longitude=?, location=?, comment=?, timeModified=?, model=?, serialNumber=?, powerSource=?, acCurrent=?, acVoltage=?, tapSetting=?, maxVoltage=?, maxCurrent=?, tapValue=?, tapCoarse=?, tapFine=? WHERE id=?`,
                [name, status, latitude, longitude, location, comment, timeModified, model, serialNumber, powerSource, acCurrent, acVoltage, tapSetting, maxVoltage, maxCurrent, tapValue, tapCoarse, tapFine, id])
            if (result.rowsAffected === 0)
                throw 'Rectifier not found'
            else return rectifier
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to update rectifier with id ${id}`, err)
        }
    }

    async updateMarker(marker) {
        try {
            const { id, name, latitude, longitude, status, comment, location, timeModified } = marker
            const result = await super.runSingleQueryTransaction(
                `UPDATE rectifiers SET name=?, status=?, latitude=?, longitude=?, location=?, comment=?, timeModified=? WHERE id=?`,
                [name, status, latitude, longitude, location, comment, timeModified, id])
            if (result.rowsAffected === 0)
                throw 'Marker not found'
            return marker
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to update rectifier')
        }
    }

    async getSubitemsById(id) {
        try {

            const result = await super.runSingleQueryTransaction(`SELECT * FROM circuits WHERE rectifierId = ? ORDER BY id DESC`, [id])
            return this.generateArray(result.rows.length, result.rows.item).map(({ id, rectifierId, uid, name, ratiCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop }) =>
                new Circuit(id, rectifierId, uid, name, ratiCurrent, ratioVoltage, targetMin, targetMax, current, voltage, voltageDrop))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get list of subitems`, err)
        }
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName}`, [])
            return this.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent }) =>
                    new Rectifier(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get rectifier list`, err)
        }
    }

    async getAllMarkers() {
        try {
            const sortingQuery = this.responseProcessor.sortingQuery(0, null, null)
            const result = await this.runSingleQueryTransaction(
                `SELECT id, '${ItemTypes.RECTIFIER}' AS itemType, uid, status, NULL AS testPointType, latitude, longitude, name, location, comment, timeCreated, timeModified FROM rectifiers WHERE latitude IS NOT NULL AND longitude IS NOT NULL${sortingQuery}`, [])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, itemType, status, testPointType, latitude, longitude, name, location, comment, timeCreated, timeModified }) =>
                    new Marker(id, uid, name, status, timeCreated, timeModified, comment, itemType, testPointType, location, latitude, longitude))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get get markers data`, err)
        }
    }


    async getDisplayListWithCurrentAndVoltage(idList) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT rectifiers.id AS itemId, rectifiers.uid AS itemUid, rectifiers.name AS itemName, rectifiers.timeModified, rectifiers.status, rectifiers.location, rectifiers.tapCoarse, rectifiers.tapFine, rectifiers.tapValue, rectifiers.tapSetting, (
                    SELECT COUNT(*) 
                    FROM assets 
                    WHERE assets.rectifierId = rectifiers.id
                ) AS assetCount, circuits.id, circuits.uid, circuits.name, '${SubitemTypes.CIRCUIT}' AS type, circuits.current AS v1, circuits.voltage AS v2 
                FROM rectifiers
                LEFT JOIN circuits ON
                rectifiers.id = circuits.rectifierId
                WHERE rectifiers.id IN ${super.convertArrayToInStatement(idList)}
                ORDER BY rectifiers.id`)
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.RECTIFIER)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get current/voltage list for rectifiers`, err)
        }
    }

    async getDisplayListWithTargets(idList) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT rectifiers.id AS itemId, rectifiers.uid AS itemUid, rectifiers.name AS itemName, rectifiers.timeModified, rectifiers.status, rectifiers.location, rectifiers.tapCoarse, rectifiers.tapFine, rectifiers.tapValue, rectifiers.tapSetting, (
                    SELECT COUNT(*) 
                    FROM assets 
                    WHERE assets.rectifierId = rectifiers.id
                ) AS assetCount, 
                circuits.id, circuits.uid, circuits.name, '${SubitemTypes.CIRCUIT}' AS type, targetMin AS v2, targetMax AS v1 
                FROM rectifiers
                LEFT JOIN circuits ON
                rectifiers.id = circuits.rectifierId
                WHERE rectifiers.id IN ${super.convertArrayToInStatement(idList)}
                ORDER BY rectifiers.id`)
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.RECTIFIER)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get current target list for rectifiers`, err)
        }
    }


}
