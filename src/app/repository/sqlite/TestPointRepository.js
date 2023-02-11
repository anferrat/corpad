import { SQLiteRepository } from "../../utils/SQLite"
import { TestPoint } from "../../entities/survey/items/TestPoint"
import { Error } from "../../utils/Error"
import { ItemResponseProcessor } from "./utils/ItemResponseProcessor"
import { ItemTypes } from "../../entities/survey/items/SurveyItem"
import { SubitemTypes } from "../../entities/survey/subitems/Subitem"
import { SubitemResponseProcessor } from "./utils/SubitemResponseProcessor"
import { ItemPropertyUpdateTypes } from "../../entities/survey/other/properties"

export class TestPointRepository extends SQLiteRepository {
    constructor () {
        super()
        this.responseProcessor = new ItemResponseProcessor()
        this.subitemProcessor = new SubitemResponseProcessor()
        this.tableName = 'testPoints'
        this.subitemTable = 'cards'
    }

    async getIdList({ filters, sorting, latitude, longitude }) {
        try {
            const statusFilter = filters.statusFilter.length > 0 ? `(status NOT IN ${this.convertArrayToInStatement(filters.statusFilter)})` : ''
            const testPointTypeFilter = filters.testPointTypeFilter.length > 0 ? (statusFilter !== '' ? ' AND ' : '') + "(testPointType NOT IN ('" + filters.testPointTypeFilter.join("', '") + "'))" : ''
            const hideEmptyFilter = filters.hideEmptyTestPoints ? (statusFilter !== '' || testPointTypeFilter !== '' ? ' AND ' : '') + "((SELECT COUNT(cards.id) FROM cards WHERE ((cards.testPointId = testPoints.id) AND cards.type NOT IN ('" + filters.readingTypeFilter.join("', '") + "')))<>0)" : ''
            const filterQuery = filters.statusFilter.length > 0 || filters.testPointTypeFilter.length > 0 || hideEmptyFilter ? ' WHERE (' + statusFilter + testPointTypeFilter + hideEmptyFilter + ')' : ''
            const sortingQuery = this.responseProcessor.sortingQuery(sorting, latitude, longitude)
            const result = await super.runSingleQueryTransaction(`SELECT id FROM ${this.tableName}${filterQuery}${sortingQuery}`, [])
            return super.generateArray(result.rows.length, result.rows.item).map(row => row.id)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get test point id list with filters ${filters} and sorting ${sorting}`, err)
        }
    }

    async getById(idList) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from testPoints WHERE id IN ${this.convertArrayToInStatement(idList)}`)
            return super.generateArray(result.rows.length, result.rows.item).map(({ id, uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified }) =>
                new TestPoint(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType))
        }
        catch (err) {
            console.log(err)
            throw new Error('DatabaseError', `Unable to get test point with id ${idList.join()}`, err)
        }
    }

    async create(testPoint) {
        const { uid, name, status, latitude, longitude, timeCreated, timeModified, testPointType, comment, location } = testPoint
        if (uid && timeCreated) {
            try {
                const result = await super.runSingleQueryTransaction(
                    `INSERT INTO ${this.tableName} (uid, timeCreated, testPointType, status, name, latitude, longitude, timeModified, location, comment) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                    [uid, timeCreated, testPointType, status, name, latitude, longitude, timeModified, location, comment])
                return new TestPoint(result.insertId, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType)
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

    async update(testPoint) {
        const { id, name, location, latitude, longitude, comment, testPointType, status, timeModified } = testPoint
        try {
            const result = await super.runSingleQueryTransaction(
                `UPDATE testPoints SET name=?, status=?, testPointType=?, latitude=?, longitude=?, location=?, comment=?, timeModified=? WHERE id=?`,
                [name, status, testPointType, latitude, longitude, location, comment, timeModified, id])
            if (result.rowsAffected === 0)
                throw 'Test point not found'
            return testPoint
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update test point with id ${id}`, err)
        }
    }

    async updateProperty(id, propertyType, value, currentTime) {
        try {
            if (propertyType !== ItemPropertyUpdateTypes.STATUS)
                throw 'Unsupported property update'
            await super.runSingleQueryTransaction(`UPDATE testPoints SET status=?, timeModified=? WHERE id=?`, [value, currentTime, id])
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update property ${propertyType} for test point with id ${id}`)
        }
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT * from ${this.tableName}}`,
                []
            )
            return this.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType }) =>
                    new TestPoint(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get test point list`, err)
        }
    }

    async getSubitemsById(id) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT cards.*, sides.sideAId, sides.sideBId FROM cards LEFT JOIN sides ON cards.id = sides.parentCardId WHERE cards.testPointId = ? ORDER BY cards.id DESC`, [id])
            return this.subitemProcessor.generateArrayWithSides(result.rows.length, result.rows.item).map(this.subitemProcessor.getSubitemFromTableData)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get list of subitems`, err)
        }
    }


    /*
    
    Methods below are used for optimization. They break clean architecture, however allow to get display cards with one query and minimal processing
   
    */

    async getDisplayListWithPotentials({ idList, readingTypeFilter, permTypes }) {
        try {
            const filterQuery = `cards.type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}`
            const idListQuery = `testPoints.id IN ${super.convertArrayToInStatement(idList)}`
            const result = await super.runSingleQueryTransaction(`
        SELECT testPoints.id AS itemId, testPoints.testPointType, testPoints.status, testPoints.name AS itemName, testPoints.timeModified, testPoints.uid AS itemUid, testPoints.location, cards.id, cards.uid, cards.name, cards.type, 
        MAX(
            CASE WHEN potentialTypes.permType = ? AND referenceCells.mainReference = 1 THEN potentials.value END) AS v1,
        MAX(
            CASE WHEN potentialTypes.permType = ? AND referenceCells.mainReference = 1 THEN potentials.value END) AS v2 
        FROM testPoints
        LEFT JOIN cards ON
        testPoints.id = cards.testPointId
        LEFT JOIN potentials ON
        potentials.cardId = cards.id 
        INNER JOIN potentialTypes ON 
        potentials.type = potentialTypes.id 
        INNER JOIN referenceCells ON 
        potentials.portableReferenceId = referenceCells.id
        WHERE
        ${filterQuery} AND
        ${idListQuery}
        GROUP BY cards.id
        UNION ALL 
        SELECT testPoints.id AS itemId, testPoints.testPointType, testPoints.status, testPoints.name AS itemName, testPoints.timeModified, testPoints.uid AS itemUid, testPoints.location, cards.id, cards.uid, cards.name, cards.type, potentials.value AS v1, potentials.value AS v2 
        FROM testPoints
        LEFT JOIN cards ON
        testPoints.id = cards.testPointId
        LEFT JOIN potentials ON
        potentials.cardId = cards.id 
        WHERE potentials.cardId IS NULL AND 
        ${filterQuery} AND
        ${idListQuery}
        ORDER BY testPoints.id`,
                [permTypes[0], permTypes[1]])
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.TEST_POINT)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get potential list for test points with permTypes ${permTypes[0], permTypes[1]}`, err)
        }
    }

    async getDisplayListWithCurrentDensity({ idList, readingTypeFilter }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT testPoints.id AS itemId, testPoints.testPointType, testPoints.status, testPoints.name AS itemName, testPoints.timeModified, testPoints.uid AS itemUid, testPoints.location, cards.id, cards.uid, cards.name, cards.type, density AS v1 
            FROM cards
            LEFT JOIN testPoints ON
            testPoints.id = cards.testPointId
            WHERE testPoints.id IN ${super.convertArrayToInStatement(idList)} AND 
            type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}
            ORDER BY testPoints.id`)
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.TEST_POINT)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get current density list for test points`, err)
        }
    }
    async getDisplayListWithCurrent({ idList, readingTypeFilter }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT testPoints.id AS itemId, testPoints.testPointType, testPoints.status, testPoints.name AS itemName, testPoints.timeModified, testPoints.uid AS itemUid, testPoints.location, cards.id, cards.uid, cards.name, cards.type,
            CASE WHEN type = ? OR type=? THEN current END AS v1 
            FROM cards
            LEFT JOIN testPoints ON
            testPoints.id = cards.testPointId
            WHERE testPoints.id IN ${super.convertArrayToInStatement(idList)} AND 
            type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}
            ORDER BY testPoints.id`,
                [SubitemTypes.SHUNT, SubitemTypes.BOND])
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.TEST_POINT)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get current list for test points`, err)
        }
    }

    async getDisplayListWithShortingCurrent({ idList, readingTypeFilter }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT testPoints.id AS itemId, testPoints.testPointType, testPoints.status, testPoints.name AS itemName, testPoints.timeModified, testPoints.uid AS itemUid, testPoints.location, cards.id, cards.uid, cards.name, cards.type, 
                CASE WHEN type = ? AND shorted = 1 THEN current END AS v1 
                FROM cards
                LEFT JOIN testPoints ON
                testPoints.id = cards.testPointId
                WHERE testPoints.id IN ${super.convertArrayToInStatement(idList)} AND 
                type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}
                ORDER BY testPoints.id`,
                [SubitemTypes.ISOLATION])
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.TEST_POINT)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get shorting current list for test points`, err)
        }
    }
}
