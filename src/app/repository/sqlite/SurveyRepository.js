import { SQLiteRepository } from "../../utils/SQLite"
import { Error } from "../../utils/Error"
import { ItemTypes, SurveyItem } from "../../entities/survey/items/SurveyItem"
import { Survey } from "../../entities/survey/other/Survey"
import { PipelineSurveyFile, SurveyFileDataFields } from "../../entities/survey/survey/PipelineSurveyFile"
import { SurveyElement } from "../../entities/survey/survey/Elements/SurveyElement"
import { TestPointElement } from "../../entities/survey/survey/Elements/TestPointElement"
import { RectifierElement } from "../../entities/survey/survey/Elements/RectifierElement"
import { PipelineElement } from "../../entities/survey/survey/Elements/PipelineElement"
import { PotentialTypeElement } from "../../entities/survey/survey/Elements/PotentialTypeElement"
import { ReferenceCellElement } from "../../entities/survey/survey/Elements/ReferenceCellElement"
import { CardElement } from "../../entities/survey/survey/Elements/CardElement"
import { PotentialElement } from "../../entities/survey/survey/Elements/PotentialElement"
import { CircuitElement } from "../../entities/survey/survey/Elements/CircuitElement"
import { SideElement } from "../../entities/survey/survey/Elements/SideElement"

export class SurveyRepository extends SQLiteRepository {
    constructor() {
        super()
    }


    async serachItem(string, limit) {
        try {
            const searchQuery = `WHERE name LIKE '%${string}%'`
            const fieldsQuery = `SELECT id, uid, name, status, timeCreated, timeModified, comment,`

            const query = `${fieldsQuery} ${ItemTypes.TEST_POINT} AS itemType, testPointType FROM testPoints ${searchQuery} UNION ALL
            ${fieldsQuery} ${ItemTypes.RECTIFIER} AS itemType, NULL AS testPointType FROM rectifiers ${searchQuery} UNION ALL
            ${fieldsQuery} ${ItemTypes.PIPELINE} AS itemType, NULL AS testPointType FROM pipelines ${searchQuery}
            ORDER BY length(name) ASC LIMIT ${limit}`

            const result = await super.runSingleQueryTransaction(query)

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
    async getSurvey() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT * FROM survey LIMIT 1')
            const { uid, name, technician } = result.rows.item(0)
            return new Survey(uid, name, technician)
        }
        catch (err) {
            throw new Error('DatabaseError', 'Unable to get survey information', err)
        }
    }

    async export() {
        try {
            const tables = ['survey', 'testPoints', 'rectifiers', 'pipelines', 'potentialTypes', 'referenceCells', 'cards', 'potentials', 'circuits', 'sides']

            const [survey, testPoints, rectifiers, pipelines, potentialTypes, referenceCells, cards, potentials, circuits, sides] =
                await this.runMultiQueryTransaction(tx =>
                    tables.map(table => this.runQuery(tx, `SELECT * FROM ${table}`, []))
                )
            return new PipelineSurveyFile(
                super.generateArray(survey.rows.length, survey.rows.item)
                    .map(({ uid, name, technician }) =>
                        new SurveyElement(uid, name, technician)),

                super.generateArray(testPoints.rows.length, testPoints.rows.item)
                    .map(({ id, uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified }) =>
                        new TestPointElement(id, uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified)),

                super.generateArray(rectifiers.rows.length, rectifiers.rows.item)
                    .map(({ id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent }) =>
                        new RectifierElement(id, uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent)),

                super.generateArray(pipelines.rows.length, pipelines.rows.item)
                    .map(({ id, uid, name, nps, material, coating, licenseNumber, timeCreated, timeModified, product, comment }) =>
                        new PipelineElement(id, uid, name, nps, material, coating, licenseNumber, timeCreated, timeModified, product, comment)),

                super.generateArray(potentialTypes.rows.length, potentialTypes.rows.item)
                    .map(({ id, uid, name, custom, permType }) =>
                        new PotentialTypeElement(id, uid, name, custom, permType)),

                super.generateArray(referenceCells.rows.length, referenceCells.rows.item)
                    .map(({ id, uid, rcType, name, mainReference }) =>
                        new ReferenceCellElement(id, uid, rcType, name, mainReference)),

                super.generateArray(cards.rows.length, cards.rows.item)
                    .map(({ id, parentId, uid, type, name, anodeMaterial, wireColor, wireGauge, fromAtoB, current, currentUnit, pipelineId, pipelineCardId, couponType, density, area, description, isolationType, shorted, rcType, nps, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop }) =>
                        new CardElement(id, parentId, uid, type, name, anodeMaterial, wireColor, wireGauge, fromAtoB, current, currentUnit, pipelineId, pipelineCardId, couponType, density, area, description, isolationType, shorted, rcType, nps, ratioCurrent, ratioVoltage, factorSelected, factor, voltageDrop)),

                super.generateArray(potentials.rows.length, potentials.rows.item)
                    .map(({ id, cardId, uid, value, type, unit, portableReferenceId, permanentReferenceId }) =>
                        new PotentialElement(id, cardId, uid, value, type, unit, portableReferenceId, permanentReferenceId)),

                super.generateArray(circuits.rows.length, circuits.rows.item)
                    .map(({ id, uid, name, rectifierId, ratioCurrent, ratioVoltage, voltageDrop, current, voltage, targetMin, targetMax }) =>
                        new CircuitElement(id, uid, name, rectifierId, ratioCurrent, ratioVoltage, voltageDrop, current, voltage, targetMin, targetMax)),

                super.generateArray(sides.rows.length, sides.rows.item)
                    .map(({ id, sideAId, sideBId, parentCardId }) =>
                        new SideElement(id, sideAId, sideBId, parentCardId))
            )
        }
        catch (err) {
            throw new Error('DatabaseError', 'Export failed', err)
        }
    }

    async import(surveyFile) {
        try {

            await this.runMultiQueryTransaction(async tx => {
                try {
                    const [testPoints, rectifiers, pipelines, potentialTypes, referenceCells, survey] = await Promise.all([
                        this.runQuery(tx, `INSERT INTO testPoints(uid, name, location, latitude, longitude, comment, testPointType, status, timeCreated, timeModified) VALUES 
            ${surveyFile.data[SurveyFileDataFields.TEST_POINTS].map(e => `(${e.uid}, ${e.name}, ${e.location}, ${e.latitide}, ${e.longitude}, ${e.comment}, ${e.testPointType}, ${e.status}, ${e.timeCreated}, ${e.timeModified})`).join()}`),

                        this.runQuery(tx, `INSERT INTO rectifiers(uid, name, status, timeCreated, timeModified, comment, location, latitude, longitude, model, serialNumber, powerSource, acVoltage, acCurrent, tapSetting, tapValue, tapCoarse, tapFine, maxVoltage, maxCurrent) VALUES 
            ${surveyFile.data[SurveyFileDataFields.RECTIFIERS].map(e => `(${e.uid}, ${e.name}, ${e.status}, ${e.timeCreated}, ${e.timeModified}, ${e.comment}, ${e.location}, ${e.latitude}, ${e.longitude}, ${e.model}, ${e.serialNumber}, ${e.powerSource}, ${e.acVoltage}, ${e.acCurrent}, ${e.tapSetting}, ${e.tapValue}, ${e.tapCoarse}, ${e.tapFine}, ${e.maxVoltage}, ${e.maxCurrent})`).join()} `),

                        this.runQuery(tx, `INSERT INTO pipelines(uid, name, nps, material, coating, licenseNumber, timeCreated, timeModified, product, comment) VALUES 
            ${surveyFile.data[SurveyFileDataFields.PIPELINES].map(e => `(${e.uid}, ${e.name}, ${e.nps}, ${e.material}, ${e.coating}, ${e.licenseNumber}, ${e.timeCreated}, ${e.timeModified}, ${e.product}, ${e.comment})`).join()} `),

                        this.runQuery(tx, `INSERT INTO potentialTypes (uid, name, custom, permType) VALUES 
            ${surveyFile.data[SurveyFileDataFields.POTENTIAL_TYPES].map(e => `(${e.uid}, ${e.name}, ${e.custom}, ${e.permType})`).join()} `),

                        this.runQuery(tx, `INSERT INTO referenceCells (uid, rcType, name, mainReference) VALUES 
            ${surveyFile.data[SurveyFileDataFields.REFERENCE_CELLS].map(e => `(${e.uid}, ${e.rcType}, ${e.name}, ${e.mainReference})`).join()} `),

                        this.runQuery(tx, `INSERT INTO survey (uid, name, technician) VALUES 
            ${surveyFile.data[SurveyFileDataFields.REFERENCE_CELLS].map(e => `(${e.uid}, ${e.name}, ${e.technician})`).join()} `),
                    ])
                    return {
                        status: 'jajajajaj'
                    }
                }
                catch (er) {
                    throw er
                }
            })
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to import survey file`, err)
        }
    }

    async exportToSpreadsheet() {

    }
}
