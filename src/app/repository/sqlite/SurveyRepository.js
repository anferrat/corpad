import { SQLiteRepository } from "../../utils/SQLite"
import { Error, errors } from "../../utils/Error"
import { ItemTypes, SurveyItem } from "../../entities/survey/items/SurveyItem"
import { Survey } from "../../entities/survey/other/Survey"

export class SurveyRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async searchItem(string) {
        try {
            const searchQuery = `WHERE name LIKE '%${string}%'`
            const fieldsQuery = `SELECT id, uid, name, timeCreated, timeModified, comment,`

            const query = `${fieldsQuery} '${ItemTypes.TEST_POINT}' AS itemType, testPointType, status, length(name) AS sort FROM testPoints ${searchQuery} UNION ALL
            ${fieldsQuery} '${ItemTypes.RECTIFIER}' AS itemType, NULL AS testPointType, status, length(name) AS sort FROM rectifiers ${searchQuery} UNION ALL
            ${fieldsQuery} '${ItemTypes.PIPELINE}' AS itemType, NULL AS testPointType, NULL AS status, length(name) AS sort FROM pipelines ${searchQuery}
            ORDER BY sort ASC`

            const result = await super.runSingleQueryTransaction(query)

            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, itemType, status, testPointType, name, comment, timeCreated, timeModifed }) =>
                    new SurveyItem(id, uid, name, status, timeCreated, timeModifed, comment, itemType, testPointType))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to serach for item with search key ${string}`, err)
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
            throw new Error(errors.DATABASE, 'Unable to create database tables', er)
        }
    }

    async reset() {
        try {
            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `DELETE FROM survey`, []),
                super.runQuery(tx, `DELETE FROM testPoints`, []),
                super.runQuery(tx, `DELETE FROM rectifiers`, []),
                super.runQuery(tx, `DELETE FROM pipelines`, []),
                super.runQuery(tx, `DELETE FROM potentialTypes`, []),
                super.runQuery(tx, 'DELETE FROM referenceCells', []),
                super.runQuery(tx, `DELETE FROM cards`, []),
                super.runQuery(tx, `DELETE FROM circuits`, []),
                super.runQuery(tx, `DELETE FROM potentials`, []),
                super.runQuery(tx, `DELETE FROM sides`, []),
            ])
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to reset database tables', er)
        }
    }

    async clearEmptyValues() {
        try {
            //kinda design problem. Null name values can appear when creating new items and exiting app withouht saving.
            this.runMultiQueryTransaction(tx => [
                super.runQuery(tx, 'DELETE FROM testPoints WHERE name IS NULL'),
                super.runQuery(tx, 'DELETE FROM rectifiers WHERE name IS NULL'),
                super.runQuery(tx, 'DELETE FROM pipelines WHERE name IS NULL'),
                super.runQuery(tx, 'DELETE FROM cards WHERE name IS NULL'),
                super.runQuery(tx, 'DELETE FROM circuits WHERE name IS NULL'),
            ])
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to clear empty values', 'Unable to clear empty values')
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
            throw new Error(errors.DATABASE, 'Unable to reset database tables', er)
        }
    }

    async getSurvey() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT * FROM survey LIMIT 1')
            const { uid, name, technician } = result.rows.item(0)
            return new Survey(uid, name, technician)
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to get survey information', err)
        }
    }

    async create(survey) {
        try {
            const { uid, name, technician } = survey
            await this.runSingleQueryTransaction('INSERT INTO survey (uid, name, technician) VALUES (?,?,?)', [uid, name, technician])
            return survey
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to get survey information', err)
        }
    }

    async updateName(name) {
        try {
            const result = await this.runSingleQueryTransaction('UPDATE survey SET name = ?', [name])
            if (result.rowAffected === 0)
                throw 'Survey not found'
            else return name
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to update survey name', err)
        }
    }

    async import({ testPoints, pipelines, rectifiers, cards, circuits, potentials, potentialTypes, survey, referenceCells, sides }) {
        /*
        Fast import -min. number of insert request to import a survey. Fails on error. Fast but messy
        boolConverter - important to wrap Boolean values before inserting to database. Null is legit option for boolean values when field is not used
        */

        const boolConverter = (bool) => bool === undefined || bool == null ? null : Number(bool)
        try {
            await this.runMultiQueryTransaction(async tx => [
                this.runQuery(tx, `INSERT INTO survey (uid, name, technician) VALUES (?,?,?)`, [survey.uid, survey.name, survey.technician]),

                testPoints.length > 0 ? this.runQuery(tx, `INSERT INTO testPoints(id, uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified) VALUES ${testPoints.map(() => `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).join(', ')}`, testPoints.map(({ id, uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified }) => [id, uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified]).flat()) : null,

                rectifiers.length > 0 ? this.runQuery(tx, `INSERT INTO rectifiers(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent) VALUES ${rectifiers.map(() => `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`).join(', ')}`,
                    rectifiers.map(({ id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent }) => [id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent]).flat()) : null,

                pipelines.length > 0 ? this.runQuery(tx, `INSERT INTO pipelines(id, uid, name, nps, material, coating, licenseNumber, timeCreated, timeModified, product, comment) VALUES ${pipelines.map(() => `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).join(', ')}`, pipelines.map(({ id, uid, name, nps, material, coating, licenseNumber, timeCreated, timeModified, product, comment }) => [id, uid, name, nps, material, boolConverter(coating), licenseNumber, timeCreated, timeModified, product, comment]).flat()) : null,

                potentialTypes.length > 0 ? this.runQuery(tx, `INSERT INTO potentialTypes (id, uid, name, permType) VALUES ${potentialTypes.map(() => `(?, ?, ?, ?)`).join(', ')}`, potentialTypes.map(({ id, uid, name, type }) => [id, uid, name, type]).flat()) : null,

                this.runQuery(tx, `INSERT INTO referenceCells (id, uid, rcType, name, mainReference) VALUES ${referenceCells.map(() => '(?,?,?,?,?)').join(',')}`, referenceCells.map(({ id, uid, rcType, name, isMainReference }) => [id, uid, rcType, name, boolConverter(isMainReference)]).flat()),

                cards.length > 0 ? this.runQuery(tx, `INSERT INTO cards(id, testPointId, uid, type, name, anodeMaterial, wireColor, wireGauge, fromAtoB, current, currentUnit, pipelineId, pipelineCardId, couponType, density, area, description, isolationType, shorted, rcType, nps, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop) VALUES 
                ${cards.map(() => `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).join(', ')}`,
                    cards.map(({ id, uid, parentId, type, name, anodeMaterial, wireColor, wireGauge, fromAtoB, current, currentUnit, pipelineId, pipelineCardId, couponType, density, area, description, isolationType, shorted, rcType, nps, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop }) => [id, parentId, uid, type, name, anodeMaterial ?? null, wireColor ?? null, wireGauge ?? null, boolConverter(fromAtoB), current ?? null, currentUnit ?? null, pipelineId ?? null, pipelineCardId ?? null, couponType ?? null, density ?? null, area ?? null, description ?? null, isolationType ?? null, boolConverter(shorted), rcType ?? null, nps ?? null, ratioCurrent ?? null, ratioVoltage ?? null, boolConverter(factorSelected), factor ?? null, voltageDrop ?? null]).flat()) : null,

                circuits.length > 0 ? this.runQuery(tx, `INSERT INTO circuits (id, uid, name, rectifierId, ratioCurrent, ratioVoltage, voltageDrop, current, voltage, targetMin, targetMax) VALUES
                    ${circuits.map(() => `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).join(', ')}`, circuits.map(({ id, parentId, uid, name, ratioCurrent, ratioVoltage, voltageDrop, current, voltage, targetMin, targetMax }) =>
                    [id, uid, name, parentId, ratioCurrent, ratioVoltage, voltageDrop, current, voltage, targetMin, targetMax]).flat()) : null,

                potentials.length > 0 ? this.runQuery(tx, `INSERT INTO potentials (id, cardId, uid, value, type, portableReferenceId, permanentReferenceId) VALUES ${potentials.map(() => `(?,?,?,?,?,?,?)`).join(', ')}`,
                    potentials.map(({ id, uid, subitemId, value, potentialType, isPortableReference, referenceCellId }) => {
                        const portableReferenceId = isPortableReference ? referenceCellId : null
                        const permanentReferenceId = isPortableReference ? null : referenceCellId
                        return [id, subitemId, uid, value, potentialType, portableReferenceId, permanentReferenceId]
                    }).flat()) : null,


                sides.length > 0 ? this.runQuery(tx, `INSERT INTO sides (sideAId, sideBId, parentCardId) VALUES ${sides.map(() => `(?,?,?)`)}`,
                    sides.map(({ parentId, sideAId, sideBId }) => [sideAId, sideBId, parentId]).flat()) : null
            ])
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to import survey file`, err)
        }
    }
}
