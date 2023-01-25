import { SQLiteRepository } from "../../utils/SQLite"
import { TestPoint } from "../../entities/survey/items/TestPoint"
import { ItemStatuses, TestPointTypes } from "../../entities/survey/items/SurveyItem"
import { Error } from "../../utils/Error"
import { DisplayCardReading } from "../../entities/survey/other/DisplayCard"

export class TestPointRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'testPoints'
        this.subitemTable = 'cards'
    }

    async getIdList({ filters, sorting, latitude, longitude }) {
        try {
            const statusFilter = filters.statusFilter.length > 0 ? "(status NOT IN ('" + filters.statusFilter.join("', '") + "'))" : ''
            const testPointTypeFilter = filters.testPointTypeFilter.length > 0 ? (statusFilter !== '' ? ' AND ' : '') + "(testPointType NOT IN ('" + filters.testPointTypeFilter.join("', '") + "'))" : ''
            const hideEmptyFilter = filters.hideEmptyTestPoints ? (statusFilter !== '' || testPointTypeFilter !== '' ? ' AND ' : '') + "((SELECT COUNT(cards.id) FROM cards WHERE ((cards.testPointId = testPoints.id) AND cards.type NOT IN ('" + filters.readingTypeFilter.join("', '") + "')))<>0)" : ''
            const filterQuery = filters.statusFilter.length > 0 || filters.testPointTypeFilter.length > 0 || hideEmptyFilter ? ' WHERE (' + statusFilter + testPointTypeFilter + hideEmptyFilter + ')' : ''
            const sortingQuery = this.getSortingQuery(sorting, latitude, longitude)
            const result = await super.runSingleQueryTransaction(`SELECT id FROM ${this.tableName}${filterQuery}${sortingQuery}`, [])
            return super.generateArray(result.rows.length, result.rows.item).map(row => row.id)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get test point id list with filters ${filters} and sorting ${sorting}`, err)
        }
    }

    async getById(id) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from ${this.tableName} WHERE id = ? LIMIT 1`, [id])
            const { uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified } = result.rows.item(0)
            return new TestPoint(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get test point with id ${id}`, err)
        }
    }

    async create({ name, latitude, longitude, uid, currentTime }) {
        if (uid && currentTime) {
            try {

                const result = await super.runSingleQueryTransaction(
                    `INSERT INTO ${this.tableName} (uid, timeCreated, testPointType, status, name, latitude, longitude, timeModified) VALUES (?,?,?,?,?,?,?,?)`,
                    [uid, currentTime, TestPointTypes.TEST_STATION, ItemStatuses.UNKNOWN, name, latitude, longitude, currentTime])
                return new TestPoint(result.insertId, uid, name, ItemStatuses.UNKNOWN, currentTime, currentTime, null, null, latitude, longitude, TestPointTypes.TEST_STATION)
            }
            catch (err) {
                throw new Error('DatabaseError', `Unable to create test point with name ${name}, latitude ${latitude} and longitude ${longitude}.`, err)
            }
        }
        else throw new Error('CorpadError', `Unable to create test point without required minimum parameters. Name: ${name}, uid: ${uid}, currentTime: ${currentTime}`)
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${this.tableName} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Test point doesn't exist` // Silently fail if item not found
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to delete test point with id ${id}`, err)
        }
    }

    async update({ id, name, location, latitude, longitude, comment, testPointType, status, timeModified }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `UPDATE testPoints SET name=?, status=?, testPointType=?, latitude=?, longitude=?, location=?, comment=?, timeModified=? WHERE id=?`,
                [name, status, testPointType, latitude, longitude, location, comment, timeModified, id])
            if (result.rowsAffected === 0) {
                throw 'Test point not found'
            }
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update test point with id ${id}`, err)
        }
    }

    async getSubitemListById({ id, readingTypeFilter }) {
        try {
            const filterQuery = readingTypeFilter.length === 0 ? '' : `AND type NOT IN ('${readingTypeFilter.join("', '")}')`
            const result = await super.runSingleQueryTransaction(`SELECT id, uid, name, type FROM ${this.subitemTable} WHERE (testPointId = ?${filterQuery})`, [id])
            const { uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified } = result.rows.item(0)
            return new TestPoint(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get test point with id ${id}`, err)
        }
    }
    async getSubitemListWithPotentialsById({ id, readingTypeFilter, permTypes }) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT cards.id, cards.uid, cards.name, cards.type, MAX(CASE WHEN potentialTypes.permType = ? AND referenceCells.mainReference = 1 THEN potentials.value END) AS v1, MAX(CASE WHEN potentialTypes.permType = ? AND referenceCells.mainReference = 1 THEN potentials.value END) AS v2 FROM potentials INNER JOIN potentialTypes ON potentials.type = potentialTypes.id INNER JOIN referenceCells ON potentials.portableReferenceId = referenceCells.id LEFT JOIN cards ON potentials.cardId = cards.id WHERE cards.testPointId = ? AND cards.type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)} GROUP BY cards.id UNION ALL SELECT cards.id, cards.uid, cards.name, cards.type, potentials.value AS v1, potentials.value AS v2 FROM cards LEFT JOIN potentials ON potentials.cardId = cards.id WHERE potentials.cardId IS NULL AND cards.testPointId = ? AND cards.type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}`,
                [permTypes[0], permTypes[1], id, id])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(row => new DisplayCardReading(row.id, row.uid, id, row.type, row.name, row.v1, row.v2))

        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get potential list for test point with id ${id} and permTypes ${permTypes[0], permTypes[1]}`)
        }
    }

    async getSubitemListWithCurrentDensityById({ id, readingTypeFilter }) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT id, uid, name, type, density AS v1 from cards WHERE testPointId = ? AND type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}`,
                [id])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(row => new DisplayCardReading(row.id, row.uid, id, row.type, row.name, row.v1))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get current density list for test point with id ${id}`)
        }
    }
    async getSubitemListWithCurrentById({ id, readingTypeFilter }) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT id, uid, name, type, CASE WHEN type = 'BD' OR type='SH' THEN current END AS v1 from cards WHERE testPointId = ? AND type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}`,
                [id])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(row => new DisplayCardReading(row.id, row.uid, id, row.type, row.name, row.v1))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get current list for test point with id ${id}`)
        }
    }

    async getSubitemListWithShortingCurrentById({ id, readingTypeFilter }) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT id, uid, name, type, CASE WHEN type = 'IK' AND shorted = 1 THEN current END AS v1 from cards WHERE testPointId = ? AND type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}`,
                [id])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(row => new DisplayCardReading(row.id, row.uid, id, row.type, row.name, row.v1))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get shorting current list for test point with id ${id}`)
        }
    }

    async updateProperty({ id, property, value, currentTime }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `UPDATE ${this.tableName} SET ${property}=?, timeModified=? WHERE id=?`,
                [value, currentTime, id]
            )
            if (result.rowsAffected === 0) {
                throw 'Test point not found'
            }
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update property ${property} for test point with id ${id}`)
        }
    }
}
