import { SQLiteRepository } from "../../utils/SQLite"
import { Error } from "../../utils/Error"
import { ItemTypes, SurveyItem } from "../../entities/survey/items/SurveyItem"

export class SurveyRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async serachItem(string, limit) {
        try {
            const searchQuery = `WHERE name LIKE '%${string}%'`
            const fieldsQuery = `SELECT id, uid, name, status, timeCreated, timeModified, comment,`
            const result = await super.runSingleQueryTransaction(
                `${fieldsQuery} ${ItemTypes.TEST_POINT} AS itemType, testPointType FROM testPoints ${searchQuery} UNION ALL
                ${fieldsQuery} ${ItemTypes.RECTIFIER} AS itemType, NULL AS testPointType FROM rectifiers ${searchQuery} UNION ALL
                ${fieldsQuery} ${ItemTypes.PIPELINE} AS itemType, NULL AS testPointType FROM pipelines ${searchQuery}
                ORDER BY length(name) ASC LIMIT ${limit}`
                    `SELECT id, uid, name, status timeModified, testPointType AS type, 'TEST_POINT' as dataType, length(name) AS nameLength FROM testPoints WHERE name LIKE '%" + data.searchString + "%' UNION ALL SELECT id, uid, name, timeModified, 'RT' AS type, 'RECTIFIER' as dataType, length(name) AS nameLength FROM rectifiers WHERE name LIKE '%" + data.searchString + "%' UNION ALL SELECT id, uid, name, timeModified, 'PL' AS type, 'PIPELINE' as dataType, length(name) AS nameLength FROM pipelines WHERE name LIKE '%" + data.searchString + "%' ORDER BY nameLength ASC LIMIT 20`
                    `SELECT id, '${ItemTypes.TEST_POINT}' AS itemType, uid, status, testPointType, latitude, longitude, name, location, comment, timeCreated, timeModified FROM testPoints ${searchQuery} UNION ALL SELECT id, '${ItemTypes.RECTIFIER}' AS itemType, uid, status, NULL AS testPointType, latitude, longitude, name, location, comment, timeCreated, timeModified FROM rectifiers ${searchQuery} ORDER BY length(name) ASC LIMIT ${limit}`,
                [])

            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, itemType, status, testPointType, name, comment, timeCreated, timeModifed }) =>
                    new SurveyItem(id, uid, name, status, timeCreated, timeModifed, comment, itemType, testPointType))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to serach for item with search key ${string}`, err)
        }
    }

    async init() {
        try {
            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS survey (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, name TEXT, technician TEXT)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS calculators (id INTEGER PRIMARY KEY NOT NULL, timeCreated INTEGER, calculatorType TEXT, data TEXT, name TEXT, latitude REAL, longitude REAL)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, pipelineNameAsDefault BOOLEAN, defaultPotentialUnit INTEGER, autoCreatePotentials BOOLEAN, isSurveyNew BOOLEAN, isCloud BOOLEAN, originalHash TEXT, fileName TEXT, cloudId TEXT, lastSync INTEGER, onboarding TEXT)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS defaultNames (id INTEGER PRIMARY KEY NOT NULL, type TEXT, name TEXT)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS rectifiers (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, location TEXT, latitude REAL, longitude REAL, comment TEXT, status INTEGER, timeCreated INTEGER, timeModified INTEGER, model TEXT, serialNumber TEXT, powerSource INTEGER, acVoltage REAL, acCurrent REAL, tapSetting INTEGER, tapValue REAL, tapCoarse INTEGER, tapFine INTEGER, maxVoltage REAL, maxCurrent REAL)`, []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS testPoints (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, location TEXT, latitude REAL, longitude REAL, comment TEXT, testPointType INTEGER, status INTEGER, timeCreated INTEGER, timeModified INTEGER)', []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS pipelines (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, name TEXT, nps INTEGER, material INTEGER, coating BOOLEAN, licenseNumber TEXT, timeCreated INTEGER, timeModified INTEGER, product INTEGER, comment TEXT)', []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS referenceCells (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, rcType INTEGER, name TEXT, mainReference BOOLEAN)`, []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS potentialTypes (id INTEGER PRIMARY KEY NOT NULL, uid TEXT NOT NULL, name TEXT NOT NULL, custom BOOLEAN, permType TEXT)', [])
            ])

            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS circuits (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, rectifierId INTEGER, ratioCurrent REAL, ratioVoltage REAL, voltageDrop REAL, current REAL, voltage REAL, targetMin REAL, targetMax REAL, FOREIGN KEY(rectifierId) REFERENCES rectifiers(id) ON DELETE CASCADE)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY NOT NULL, testPointId INTEGER NOT NULL, uid TEXT, type TEXT, name TEXT, anodeMaterial INTEGER, wireColor INTEGER, wireGauge INTEGER, fromAtoB BOOLEAN, current REAL, currentUnit TEXT, pipelineId INT, pipelineCardId INT, couponType INTEGER, density REAL, area REAL, description TEXT, isolationType INTEGER, shorted BOOLEAN, rcType INTEGER, nps INTEGER, ratioCurrent REAL, ratioVoltage REAL, factorSelected BOOLEAN, factor REAL, voltageDrop REAL, FOREIGN KEY(testPointId) REFERENCES testPoints(id) ON DELETE CASCADE, FOREIGN KEY(pipelineId) REFERENCES pipelines(id) ON DELETE SET NULL, FOREIGN KEY(pipelineCardId) REFERENCES cards(id) ON DELETE SET NULL)`, [])
            ])

            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS sides (id INTEGER PRIMARY KEY NOT NULL, sideAId INT, sideBId INT, parentCardId INT, FOREIGN KEY(parentCardId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(sideAId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(sideBId) REFERENCES cards(id) ON DELETE CASCADE)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS potentials (id INTEGER PRIMARY KEY NOT NULL, cardId INTEGER NOT NULL, uid TEXT, value REAL, type INTEGER NOT NULL, unit TEXT, portableReferenceId INTEGER, permanentReferenceId INTEGER, FOREIGN KEY(portableReferenceId) REFERENCES referenceCells(id) ON DELETE CASCADE, FOREIGN KEY(type) REFERENCES potentialTypes(id) ON DELETE CASCADE, FOREIGN KEY(cardId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(permanentReferenceId) REFERENCES cards(id) ON DELETE CASCADE)`, [])
            ])
        }
        catch (er) {
            throw new Error('DatabaseError', 'Unable to create database tables', er)
        }
    }

    async reset() {
        try {
            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `DELETE * FROM survey`, []),
                super.runQuery(tx, `DELETE * FROM testPoints`, []),
                super.runQuery(tx, `DELETE * FROM rectifiers`, []),
                super.runQuery(tx, `DELETE * FROM pipelines`, []),
                super.runQuery(tx, `DELETE * from potentialTypes`, []),
                super.runQuery(tx, 'DELETE * from refrenceCells', []),
            ])
        }
        catch (er) {
            throw new Error('DatabaseError', 'Unable to reset database tables', er)
        }
    }

    async fullResetDevOnly() {
        try {
            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `DROP TABLE IF EXISTS survey`, []),
                super.runQuery(tx, `DROP TABLE IF EXISTS testPoints`, []),
                super.runQuery(tx, `DROP TABLE IF EXISTS rectifiers`, []),
                super.runQuery(tx, `DROP TABLE IF EXISTS pipelines`, []),
                super.runQuery(tx, `DROP TABLE IF EXISTS potentialTypes`, []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS referenceCells', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS calculators', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS settings', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS circuits', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS cards', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS sides', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS potentials', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS defaultNames', []),
            ])
        }
        catch (er) {
            throw new Error('DatabaseError', 'Unable to reset database tables', er)
        }
    }

    async export() {

    }

    async import() {

    }

    async exportToSpreadsheet() {

    }
}
