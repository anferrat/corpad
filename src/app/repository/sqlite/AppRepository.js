import { SQLiteRepository } from "../../utils/SQLite"
import { Error, errors } from "../../utils/Error"
import { schemaVersion } from "../../config/database"

export class AppRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async createTables() {
        try {
            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS survey (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, name TEXT, technician TEXT)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS calculators (id INTEGER PRIMARY KEY NOT NULL, timeCreated INTEGER, calculatorType TEXT, data TEXT, name TEXT, latitude REAL, longitude REAL)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, pipelineNameAsDefault BOOLEAN, defaultPotentialUnit INTEGER, autoCreatePotentials BOOLEAN, isSurveyNew BOOLEAN, isCloud BOOLEAN, originalHash TEXT, fileName TEXT, cloudId TEXT, lastSync INTEGER, onboarding TEXT, multimeter TEXT)`, []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS schemaVersion (version INTEGER)', []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS defaultNames (id INTEGER PRIMARY KEY NOT NULL, type TEXT, name TEXT)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS rectifiers (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, location TEXT, latitude REAL, longitude REAL, comment TEXT, status INTEGER, timeCreated INTEGER, timeModified INTEGER, model TEXT, serialNumber TEXT, powerSource INTEGER, acVoltage REAL, acCurrent REAL, tapSetting INTEGER, tapValue REAL, tapCoarse INTEGER, tapFine INTEGER, maxVoltage REAL, maxCurrent REAL)`, []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS testPoints (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, location TEXT, latitude REAL, longitude REAL, comment TEXT, testPointType INTEGER, status INTEGER, timeCreated INTEGER, timeModified INTEGER)', []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS pipelines (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, name TEXT, nps INTEGER, material INTEGER, coating BOOLEAN, licenseNumber TEXT, timeCreated INTEGER, timeModified INTEGER, product INTEGER, comment TEXT)', []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS referenceCells (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, rcType INTEGER, name TEXT, mainReference BOOLEAN)`, []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS potentialTypes (id INTEGER PRIMARY KEY NOT NULL, uid TEXT NOT NULL, name TEXT NOT NULL, custom BOOLEAN, permType TEXT)', [])
            ])

            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS circuits (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, rectifierId INTEGER, ratioCurrent REAL, ratioVoltage REAL, voltageDrop REAL, current REAL, voltage REAL, targetMin REAL, targetMax REAL, FOREIGN KEY(rectifierId) REFERENCES rectifiers(id) ON DELETE CASCADE)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY NOT NULL, testPointId INTEGER NOT NULL, uid TEXT, type TEXT, name TEXT, anodeMaterial INTEGER, wireColor INTEGER, wireGauge INTEGER, fromAtoB BOOLEAN, current REAL, currentUnit TEXT, pipelineId INT, pipelineCardId INT, couponType INTEGER, density REAL, area REAL, description TEXT, isolationType INTEGER, shorted BOOLEAN, rcType INTEGER, nps INTEGER, ratioCurrent REAL, ratioVoltage REAL, factorSelected BOOLEAN, factor REAL, voltageDrop REAL, oldCurrent REAL, oldVoltageDrop REAL, FOREIGN KEY(testPointId) REFERENCES testPoints(id) ON DELETE CASCADE, FOREIGN KEY(pipelineId) REFERENCES pipelines(id) ON DELETE SET NULL, FOREIGN KEY(pipelineCardId) REFERENCES cards(id) ON DELETE SET NULL)`, [])
            ])

            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS sides (id INTEGER PRIMARY KEY NOT NULL, sideAId INT, sideBId INT, parentCardId INT, FOREIGN KEY(parentCardId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(sideAId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(sideBId) REFERENCES cards(id) ON DELETE CASCADE)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS potentials (id INTEGER PRIMARY KEY NOT NULL, cardId INTEGER NOT NULL, uid TEXT, value REAL, type INTEGER NOT NULL, oldValue REAL, unit TEXT, portableReferenceId INTEGER, permanentReferenceId INTEGER, FOREIGN KEY(portableReferenceId) REFERENCES referenceCells(id) ON DELETE CASCADE, FOREIGN KEY(type) REFERENCES potentialTypes(id) ON DELETE CASCADE, FOREIGN KEY(cardId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(permanentReferenceId) REFERENCES cards(id) ON DELETE CASCADE)`, [])
            ])
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to create database tables', er)
        }
    }


    async getSchemaVersion() {
        try {
            const { rows } = await super.runSingleQueryTransaction('SELECT * FROM schemaVersion LIMIT 1', [])
            if (rows.length === 0)
                return null
            else
                return rows.item(0).version
        }
        catch (er) {
            //no Errros thrown while adjusting schemas
            //console.log(er)
        }
    }


    async adjustDatabaseSchema(version) {
        try {
            switch (version) {
                case null:
                    return await this.runMultiQueryTransaction(tx => [
                        this.runQuery(tx, 'ALTER TABLE settings ADD multimeter TEXT'),
                        this.runQuery(tx, 'ALTER TABLE potentials ADD oldValue REAL'),
                        this.runQuery(tx, 'ALTER TABLE cards ADD oldCurrent REAL'),
                        this.runQuery(tx, 'ALTER TABLE cards ADD oldVoltageDrop REAL'),
                        //Always include schema version update at the end of transaction
                        this.runQuery(tx, 'DELETE FROM schemaVersion', []),
                        this.runQuery(tx, 'INSERT INTO schemaVersion (version) VALUES(?)', [schemaVersion])
                    ])
            }
        }
        catch (er) {
            //no Errros thrown while adjusting schemas
            //console.log(er)
        }

    }

    async fullResetDevOnly() {
        try {
            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `DROP TABLE IF EXISTS survey`, []),
                super.runQuery(tx, `DROP TABLE IF EXISTS schemaVersion`, []),
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

}
