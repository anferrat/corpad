import { SQLiteRepository } from "../../utils/SQLite"
import { Rectifier } from "../../entities/survey/items/Rectifier"
import { DisplayCardReading } from '../../entities/survey/other/DisplayCard'
import { ItemStatuses } from "../../entities/survey/items/SurveyItem"
import { Error } from "../../utils/Error"

export class RectifierRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'rectifiers'
        this.subitemTable = 'circuits'
    }

    async getIdList({ sorting, latitude, longitude }) {
        try {
            const sortingQuery = this.getSortingQuery(sorting, latitude, longitude)
            const result = await super.runSingleQueryTransaction(`SELECT id FROM ${this.tableName}${sortingQuery}`, [])
            return super.generateArray(result.rows.length, result.rows.item).map(row => row.id)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get rectifier id list with sorting ${sorting}`, err)
        }
    }

    async getById(id) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName} WHERE id = ? LIMIT 1`, [id])
            const { id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent } = result.rows.item(0)
            return new Rectifier(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get rectifer with id ${id}`, err)
        }
    }

    async create({ uid, currentTime, name, location, latitude, longitude, comment, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent }) {
        if (uid && currentTime) {
            try {
                const result = await super.runSingleQueryTransaction(
                    `INSERT INTO rectifiers (uid, timeCreated, status, name, location, latitude, longitude, comment, timeModified, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [uid, currentTime, ItemStatuses.UNKNOWN, name, location, latitude, longitude, comment, currentTime, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent])
                return new Rectifier(result.insertId, uid, name, ItemStatuses.UNKNOWN, currentTime, currentTime, null, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)
            }
            catch (err) {
                throw new Error('DatabaseError', `Unable to create rectifier with name ${name}, latitude ${latitude} and longitude ${longitude}.`, err)
            }
        }
        else throw new Error('CorpadError', `Unable to create test point without required minimum parameters. Name: ${name}, uid: ${uid}, currentTime: ${currentTime}`)
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${this.tableName} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Rectifier doesn't exist` // Silently fail if item not found
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to delete rectifier with id ${id}`, err)
        }
    }

    async update({ id, timeModified, status, name, location, latitude, longitude, comment, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `UPDATE rectifiers SET name=?, status=?, latitude=?, longitude=?, location=?, comment=?, timeModified=?, model=?, serialNumber=?, powerSource=?, acCurrent=?, acVoltage=?, tapSetting=?, maxVoltage=?, maxCurrent=?, tapValue=?, tapCoarse=?, tapFine=? WHERE id=?`,
                [name, status, latitude, longitude, location, comment, timeModified, model, serialNumber, powerSource, acCurrent, acVoltage, tapSetting, maxVoltage, maxCurrent, tapValue, tapCoarse, tapFine, id])
            if (result.rowsAffected === 0) {
                throw 'Rectifier not found'
            }
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update rectifier with id ${id}`, err)
        }
    }

    async getSubitemListWithCurrent({ id }) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT id, uid, name, 'CT' AS type, current AS v1 FROM circuits WHERE rectifierId = ?`,
                [id])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(row => new DisplayCardReading(row.id, row.uid, id, row.type, row.name, row.v1))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get current list for rectifier with id ${id}`)
        }
    }

    async getSubitemListWithVoltage({ id }) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT id, uid, name, 'CT' AS type, voltage AS v1 FROM circuits WHERE rectifierId = ?`,
                [id])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(row => new DisplayCardReading(row.id, row.uid, id, row.type, row.name, row.v1))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get voltage list for rectifier with id ${id}`)
        }
    }

    async getSubitemListWithTargets({ id }) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT id, uid, name, 'CT' AS type, targetMin AS v1, targetMax AS v2 FROM circuits WHERE rectifierId = ?`,
                [id])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(row => new DisplayCardReading(row.id, row.uid, id, row.type, row.name, row.v1, row.v2))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get current target list for rectifier with id ${id}`)
        }
    }

    async updateProperty({ id, property, value, currentTime }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `UPDATE ${this.tableName} SET ${property}=?, timeModified=? WHERE id=?`,
                [value, currentTime, id]
            )
            if (result.rowsAffected === 0) {
                throw 'Rectifier not found'
            }
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update property ${property} for rectifier with id ${id}`)
        }
    }
}
