import { SQLiteRepository } from "../../utils/SQLite"
import { TestPoint } from "../../entities/survey/items/TestPoint"
import { Marker } from "../../entities/survey/items/Marker"
import { Error, errors } from "../../utils/Error"
import { ItemResponseProcessor } from "./utils/ItemResponseProcessor"
import { ItemTypes, SubitemTypes } from "../../../constants/global"
import { SubitemResponseProcessor } from "./utils/SubitemResponseProcessor"

export class TestPointRepository extends SQLiteRepository {
    constructor() {
        super()
        this.responseProcessor = new ItemResponseProcessor()
        this.subitemProcessor = new SubitemResponseProcessor()
        this.tableName = 'testPoints'
        this.subitemTable = 'cards'
    }

    async getIdList({ filters, sorting, latitude, longitude }) {
        try {
            const getFilterQuery = (filters) => {
                if (filters) {
                    const statusFilter = filters.statusFilter.length > 0 ? `(status NOT IN ${this.convertArrayToInStatement(filters.statusFilter)})` : ''
                    const testPointTypeFilter = filters.testPointTypeFilter.length > 0 ? (statusFilter !== '' ? ' AND ' : '') + "(testPointType NOT IN ('" + filters.testPointTypeFilter.join("', '") + "'))" : ''
                    const hideEmptyFilter = filters.hideEmptyTestPoints ? (statusFilter !== '' || testPointTypeFilter !== '' ? ' AND ' : '') + "((SELECT COUNT(cards.id) FROM cards WHERE ((cards.testPointId = testPoints.id) AND cards.type NOT IN ('" + filters.readingTypeFilter.join("', '") + "')))<>0)" : ''
                    return filters.statusFilter.length > 0 || filters.testPointTypeFilter.length > 0 || hideEmptyFilter ? ' WHERE (' + statusFilter + testPointTypeFilter + hideEmptyFilter + ')' : ''
                }
                else return ''
            }
            const sortingQuery = this.responseProcessor.sortingQuery(sorting, latitude, longitude)
            const filterQuery = getFilterQuery(filters)
            const result = await super.runSingleQueryTransaction(`SELECT id FROM ${this.tableName}${filterQuery}${sortingQuery}`, [])
            return super.generateArray(result.rows.length, result.rows.item).map(row => row.id)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get test point id list with filters ${filters} and sorting ${sorting}`, err)
        }
    }

    async getById(idList) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from testPoints WHERE id IN ${this.convertArrayToInStatement(idList)}`)
            return super.generateArray(result.rows.length, result.rows.item).map(({ id, uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified }) =>
                new TestPoint(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get test point with id ${idList.join()}`, err)
        }
    }

    async getByUid(uid) {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * from testPoints WHERE uid=?`, [uid])
            const testPoint = result.rows.item(0)
            if (testPoint) {
                const { id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType } = testPoint
                return new TestPoint(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType)
            }
            else
                throw 'No item with such uid'
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get test point with uid ${uid}`, err)
        }
    }

    async create(testPoint) {
        const { id, uid, name, status, latitude, longitude, timeCreated, timeModified, testPointType, comment, location } = testPoint
        if (uid && timeCreated) {
            try {
                const result = await super.runSingleQueryTransaction(
                    `INSERT INTO ${this.tableName} (id, uid, timeCreated, testPointType, status, name, latitude, longitude, timeModified, location, comment) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                    [id, uid, timeCreated, testPointType, status, name, latitude, longitude, timeModified, location, comment])
                return new TestPoint(result.insertId, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType)
            }
            catch (err) {
                throw new Error(errors.DATABASE, `Unable to create test point with name ${name}, latitude ${latitude} and longitude ${longitude}.`, err)
            }
        }
        else throw new Error(errors.GENERAL, `Unable to create test point without required minimum parameters. Name: ${name}, uid: ${uid}, currentTime: ${currentTime}`)
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${this.tableName} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Test point doesn't exist` // Silently fail if item not found
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to delete test point with id ${id}`, err)
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
            throw new Error(errors.DATABASE, `Unable to update test point with id ${id}`, err)
        }
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT * FROM testPoints`, [])
            return this.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType }) =>
                    new TestPoint(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, testPointType))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get test point list`, err)

        }
    }

    async getAllMarkers() {
        try {
            const sortingQuery = this.responseProcessor.sortingQuery(0, null, null)
            const result = await this.runSingleQueryTransaction(
                `SELECT id,'${ItemTypes.TEST_POINT}' AS itemType, uid, status, testPointType, latitude, longitude, name, location, comment, timeCreated, timeModified FROM testPoints WHERE latitude IS NOT NULL AND longitude IS NOT NULL${sortingQuery}`, [])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, itemType, status, testPointType, latitude, longitude, name, location, comment, timeCreated, timeModified }) =>
                    new Marker(id, uid, name, status, timeCreated, timeModified, comment, itemType, testPointType, location, latitude, longitude))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get get markers data`, err)
        }
    }

    async getSubitemsById(id) {
        try {
            const result = await super.runSingleQueryTransaction(`
            SELECT cards.*, sides.sideAId, sides.sideBId, soilResistivityLayers.id AS layerId, soilResistivityLayers.uid as layerUid, soilResistivityLayers.spacing, soilResistivityLayers.resistanceToZero, soilResistivityLayers.resistanceToNext, soilResistivityLayers.resistivityToZero, soilResistivityLayers.resistivityToNext FROM cards 
            LEFT JOIN sides ON 
            cards.id = sides.parentCardId 
            LEFT JOIN soilResistivityLayers ON 
            cards.id = soilResistivityLayers.parentId
            WHERE cards.testPointId = ? 
            ORDER BY cards.id DESC`, [id])
            return this.subitemProcessor.generateSubitemDataArray(result.rows.length, result.rows.item).map(this.subitemProcessor.getSubitemFromTableData)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get list of subitems`, err)
        }
    }

    async getSubitemsWithPotentialsById(id) {
        try {
            const { rows } = await super.runSingleQueryTransaction(
                `SELECT cards.*, potentials.id AS potentialId, potentials.uid AS potentialUid, potentials.value AS potentialValue, potentials.oldValue AS potentialOldValue, potentials.type AS potentialTypeId, potentials.permanentReferenceId, potentials.portableReferenceId, sides.sideAId, sides.sideBId, soilResistivityLayers.id AS layerId, soilResistivityLayers.uid as layerUid, soilResistivityLayers.spacing, soilResistivityLayers.resistanceToZero, soilResistivityLayers.resistanceToNext, soilResistivityLayers.resistivityToZero, soilResistivityLayers.resistivityToNext FROM cards 
                LEFT JOIN sides 
                ON cards.id = sides.parentCardId
                LEFT JOIN soilResistivityLayers 
                ON cards.id = soilResistivityLayers.parentId
                LEFT JOIN potentials
                ON cards.id = potentials.cardId
                LEFT JOIN potentialTypes
                ON potentials.type = potentialTypes.id
                WHERE cards.testPointId = ? 
                ORDER BY cards.id DESC, potentials.permanentReferenceId, potentials.portableReferenceId, potentialTypes.id`, [id])
            return this.subitemProcessor.generateSubitemDataArray(rows.length, rows.item).map((data) => {
                const subitem = this.subitemProcessor.getSubitemFromTableData(data)
                subitem.setPotentials(data.potentials)
                return subitem
            })
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get list of subitems`, err)
        }
    }

    async updateMarker(marker) {
        try {
            const { id, name, latitude, longitude, status, comment, location, timeModified } = marker
            const result = await super.runSingleQueryTransaction(
                `UPDATE testPoints SET name=?, status=?, latitude=?, longitude=?, location=?, comment=?, timeModified=? WHERE id=?`,
                [name, status, latitude, longitude, location, comment, timeModified, id])
            if (result.rowsAffected === 0)
                throw 'Marker not found'
            return marker
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to update test point')
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
        (
            SELECT COUNT(*) 
            FROM assets 
            WHERE assets.testPointId = testPoints.id
        ) AS assetCount,
        MAX(
            CASE WHEN potentialTypes.permType = ? AND referenceCells.mainReference = 1 THEN potentials.value END) AS v1,
        MAX(
            CASE WHEN potentialTypes.permType = ? AND referenceCells.mainReference = 1 THEN potentials.value END) AS v2 
        FROM testPoints
        LEFT JOIN cards ON
        testPoints.id = cards.testPointId AND ${filterQuery}
        LEFT JOIN potentials ON
        potentials.cardId = cards.id 
        INNER JOIN potentialTypes ON 
        potentials.type = potentialTypes.id 
        INNER JOIN referenceCells ON 
        potentials.portableReferenceId = referenceCells.id
        WHERE
        ${idListQuery}
        GROUP BY cards.id
        UNION ALL 
        SELECT testPoints.id AS itemId, testPoints.testPointType, testPoints.status, testPoints.name AS itemName, testPoints.timeModified, testPoints.uid AS itemUid, testPoints.location, 
        cards.id, cards.uid, cards.name, cards.type, 
        (
            SELECT COUNT(*) 
            FROM assets 
            WHERE assets.testPointId = testPoints.id
        ) AS assetCount, potentials.value AS v1, potentials.value AS v2
        FROM testPoints
        LEFT JOIN cards ON
        testPoints.id = cards.testPointId AND ${filterQuery}
        LEFT JOIN potentials ON
        potentials.cardId = cards.id
        WHERE potentials.cardId IS NULL AND 
        ${idListQuery}
        ORDER BY testPoints.id`,
                [permTypes[0], permTypes[1]])
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.TEST_POINT)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get potential list for test points with permTypes ${permTypes[0], permTypes[1]}`, err)
        }
    }

    async getDisplayListWithCurrentDensity({ idList, readingTypeFilter }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT testPoints.id AS itemId, testPoints.testPointType, testPoints.status, testPoints.name AS itemName, testPoints.timeModified, testPoints.uid AS itemUid, testPoints.location, (
                    SELECT COUNT(*) 
                    FROM assets 
                    WHERE assets.testPointId = testPoints.id
                ) AS assetCount,
                 cards.id, cards.uid, cards.name, cards.type, density AS v1 
            FROM testPoints
            LEFT JOIN cards ON
            testPoints.id = cards.testPointId AND cards.type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}
            WHERE testPoints.id IN ${super.convertArrayToInStatement(idList)}
            ORDER BY testPoints.id`)
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.TEST_POINT)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get current density list for test points`, err)
        }
    }
    async getDisplayListWithCurrent({ idList, readingTypeFilter }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT testPoints.id AS itemId, testPoints.testPointType, testPoints.status, testPoints.name AS itemName, testPoints.timeModified, testPoints.uid AS itemUid, testPoints.location, (
                    SELECT COUNT(*) 
                    FROM assets 
                    WHERE assets.testPointId = testPoints.id
                ) AS assetCount, cards.id, cards.uid, cards.name, cards.type,
            CASE WHEN type = ? OR type = ? THEN current END AS v1 
            FROM testPoints
            LEFT JOIN cards ON
            testPoints.id = cards.testPointId AND cards.type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}
            WHERE testPoints.id IN ${super.convertArrayToInStatement(idList)}
            ORDER BY testPoints.id`,
                [SubitemTypes.SHUNT, SubitemTypes.BOND])
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.TEST_POINT)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get current list for test points`, err)
        }
    }

    async getDisplayListWithShortingCurrent({ idList, readingTypeFilter }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT testPoints.id AS itemId, testPoints.testPointType, testPoints.status, testPoints.name AS itemName, testPoints.timeModified, testPoints.uid AS itemUid, testPoints.location, (
                    SELECT COUNT(*) 
                    FROM assets 
                    WHERE assets.testPointId = testPoints.id
                ) AS assetCount, cards.id, cards.uid, cards.name, cards.type, 
                CASE WHEN type = ? THEN current END AS v2,
                CASE WHEN type = ? THEN shorted END AS v1
                FROM testPoints
                LEFT JOIN cards ON
                testPoints.id = cards.testPointId AND cards.type NOT IN ${super.convertArrayToInStatement(readingTypeFilter)}
                WHERE testPoints.id IN ${super.convertArrayToInStatement(idList)}
                ORDER BY testPoints.id`,
                [SubitemTypes.ISOLATION, SubitemTypes.ISOLATION])
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.TEST_POINT)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get shorting current list for test points`, err)
        }
    }
}
