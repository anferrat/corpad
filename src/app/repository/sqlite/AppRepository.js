import { SQLiteRepository } from "../../utils/SQLite"
import { Error, errors } from "../../utils/Error"
import { schemaVersion } from "../../config/database"
import { SubitemTypes } from "../../../constants/global"

export class AppRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async createTables() {
        try {
            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS survey (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, name TEXT, technician TEXT)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS calculators (id INTEGER PRIMARY KEY NOT NULL, timeCreated INTEGER, calculatorType TEXT, data TEXT, name TEXT, latitude REAL, longitude REAL)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS config (id TEXT PRIMARY KEY NOT NULL, value TEXT )`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, pipelineNameAsDefault BOOLEAN, defaultPotentialUnit INTEGER, autoCreatePotentials BOOLEAN, isSurveyNew BOOLEAN, isCloud BOOLEAN, originalHash TEXT, fileName TEXT, cloudId TEXT, lastSync INTEGER, onboarding TEXT, multimeter TEXT)`, []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS schemaVersion (version INTEGER)', []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS defaultNames (id INTEGER PRIMARY KEY NOT NULL, type TEXT, name TEXT)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS rectifiers (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, location TEXT, latitude REAL, longitude REAL, comment TEXT, status INTEGER, timeCreated INTEGER, timeModified INTEGER, model TEXT, serialNumber TEXT, powerSource INTEGER, acVoltage REAL, acCurrent REAL, tapSetting INTEGER, tapValue REAL, tapCoarse INTEGER, tapFine INTEGER, maxVoltage REAL, maxCurrent REAL)`, []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS testPoints (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, location TEXT, latitude REAL, longitude REAL, comment TEXT, testPointType INTEGER, status INTEGER, timeCreated INTEGER, timeModified INTEGER)', []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS pipelines (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, name TEXT, nps INTEGER, material INTEGER, coating BOOLEAN, licenseNumber TEXT, timeCreated INTEGER, timeModified INTEGER, product INTEGER, comment TEXT)', []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS referenceCells (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, rcType INTEGER, name TEXT, mainReference BOOLEAN)`, []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS potentialTypes (id INTEGER PRIMARY KEY NOT NULL, uid TEXT NOT NULL, name TEXT NOT NULL, custom BOOLEAN, permType TEXT, isAc BOOLEAN)', []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS mapLayers (id INTEGER PRIMARY KEY NOT NULL, uid TEXT NOT NULL, name TEXT, timeCreated INTEGER, timeModified INTEGER, comment TEXT, strokeColor INTEGER, strokeWidth INTEGER, fillColor INTEGER, visible BOOLEAN DEFAULT 1, data TEXT)`, []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS surveyFiles (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, name TEXT, fileName TEXT, cloudId TEXT, path TEXT, hash TEXT, isCloud BOOLEAN, timeModified INTEGER, assetCount INTEGER, tpCount INTEGER, rtCount INTEGER, plCount INTEGER, passedCount INTEGER)')
            ])

            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS circuits (id INTEGER PRIMARY KEY NOT NULL, uid Text, name TEXT, type TEXT, rectifierId INTEGER, ratioCurrent REAL, ratioVoltage REAL, voltageDrop REAL, current REAL, voltage REAL, targetMin REAL, targetMax REAL, enclosureType INT, materialType INT, bedType INT, FOREIGN KEY(rectifierId) REFERENCES rectifiers(id) ON DELETE CASCADE)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY NOT NULL, testPointId INTEGER NOT NULL, uid TEXT, type TEXT, name TEXT, anodeMaterial INTEGER, wireColor INTEGER, wireGauge INTEGER, fromAtoB BOOLEAN, current REAL, currentUnit TEXT, pipelineId INT, pipelineCardId INT, couponType INTEGER, density REAL, area REAL, description TEXT, isolationType INTEGER, shorted BOOLEAN, rcType INTEGER, nps INTEGER, ratioCurrent REAL, ratioVoltage REAL, factorSelected BOOLEAN, factor REAL, voltageDrop REAL, oldCurrent REAL, oldVoltageDrop REAL, spacingUnit INT, resistivityUnit INT, FOREIGN KEY(testPointId) REFERENCES testPoints(id) ON DELETE CASCADE, FOREIGN KEY(pipelineId) REFERENCES pipelines(id) ON DELETE SET NULL, FOREIGN KEY(pipelineCardId) REFERENCES cards(id) ON DELETE SET NULL)`, []),
                super.runQuery(tx, 'CREATE TABLE IF NOT EXISTS assets (id INTEGER PRIMARY KEY NOT NULL, uid TEXT NOT NULL, timeCreated INTEGER, timeModified INTEGER, comment TEXT, fileName TEXT, mediaType INTEGER, testPointId INTEGER, rectifierId INTEGER, loaded BOOLEAN, FOREIGN KEY(rectifierId) REFERENCES rectifiers(id) ON DELETE CASCADE, FOREIGN KEY(testPointId) REFERENCES testPoints(id) ON DELETE CASCADE )', []),
            ])

            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS sides (id INTEGER PRIMARY KEY NOT NULL, sideAId INT, sideBId INT, parentCardId INT, FOREIGN KEY(parentCardId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(sideAId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(sideBId) REFERENCES cards(id) ON DELETE CASCADE)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS potentials (id INTEGER PRIMARY KEY NOT NULL, cardId INTEGER NOT NULL, uid TEXT, value REAL, type INTEGER NOT NULL, oldValue REAL, timeModified INTEGER, unit TEXT, portableReferenceId INTEGER, permanentReferenceId INTEGER, FOREIGN KEY(portableReferenceId) REFERENCES referenceCells(id) ON DELETE CASCADE, FOREIGN KEY(type) REFERENCES potentialTypes(id) ON DELETE CASCADE, FOREIGN KEY(cardId) REFERENCES cards(id) ON DELETE CASCADE, FOREIGN KEY(permanentReferenceId) REFERENCES cards(id) ON DELETE CASCADE)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS soilResistivityLayers (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, spacing REAL, resistanceToZero REAL, resistanceToNext REAL, resistivityToZero REAL, resistivityToNext REAL, parentId INT, FOREIGN KEY(parentId) REFERENCES cards(id) ON DELETE CASCADE)`, []),
                super.runQuery(tx, `CREATE TABLE IF NOT EXISTS anodeBedAnodes (id INTEGER PRIMARY KEY NOT NULL, uid TEXT, current REAL, wireColor INT, wireGauge INT, parentId INT, FOREIGN KEY(parentId) REFERENCES circuits(id) ON DELETE CASCADE)`, []),
            ])

            await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, 'DELETE FROM schemaVersion', []),
                this.runQuery(tx, 'INSERT INTO schemaVersion (version) VALUES(?)', [schemaVersion])
            ])

        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to create database tables', er)
        }
    }


    async getSchemaVersion() {
        try {
            const { rows } = await super.runSingleQueryTransaction('SELECT * FROM schemaVersion LIMIT 1', [])
            if (rows.length !== 0)
                return rows.item(0).version
            else {
                throw 'Need to check if schema is null, or tables are not created yet'
            }
        }
        catch (er) {
            try {
                const [schema, settings] = await super.runMultiQueryTransaction(tx => [
                    this.runQuery(tx, "SELECT name FROM sqlite_schema WHERE type='table' AND name='schemaVersion'"),
                    this.runQuery(tx, "SELECT name FROM sqlite_schema WHERE type='table' AND name='settings'")
                ])
                const schemaTableExists = Boolean(schema.rows.length)
                const settingsTableExists = Boolean(settings.rows.length)
                if (schemaTableExists && settingsTableExists)
                    return null //impossible case, request schema adjustment just in case 
                else if (settingsTableExists && !schemaTableExists) //null schema has main tables initiated, except or shemaVersion table
                    return null
                else if (!settingsTableExists && !schemaTableExists) //tables don't exists yet, new tables will be created with latest schema, no need to adjust
                    return schemaVersion
                else return null //impossible case
            }
            catch (er) {
                return null
            }
        }
    }


    async adjustDatabaseSchema(currentSchemaVersion) {
        //when decided to update database schema u need:
        //1. Update schema version in config file
        //2. Write transaction for each previous schema version with queries to achive result schema
        //3. Update create table queries. In case of adding new tables without changing existed, schema update is not needed. 
        //Current schema version 2. 
        if (currentSchemaVersion !== schemaVersion)
            try {
                switch (currentSchemaVersion) {
                    case null:
                        return await this.runMultiQueryTransaction(tx => [
                            //to v1
                            this.runQuery(tx, 'ALTER TABLE settings ADD multimeter TEXT'),
                            this.runQuery(tx, 'ALTER TABLE potentials ADD oldValue REAL'),
                            this.runQuery(tx, 'ALTER TABLE cards ADD oldCurrent REAL'),
                            this.runQuery(tx, 'ALTER TABLE cards ADD oldVoltageDrop REAL'),
                            //to v2
                            this.runQuery(tx, 'ALTER TABLE potentials ADD timeModified INTEGER'),
                            this.runQuery(tx, 'ALTER TABLE potentialTypes ADD isAc BOOLEAN DEFAULT 0'),
                            this.runQuery(tx, 'ALTER TABLE circuits ADD enclosureType INTEGER'),
                            this.runQuery(tx, 'ALTER TABLE circuits ADD bedType INTEGER'),
                            this.runQuery(tx, 'ALTER TABLE circuits ADD materialType INTEGER'),
                            this.runQuery(tx, `ALTER TABLE circuits ADD type TEXT DEFAULT ${SubitemTypes.CIRCUIT}`),
                            this.runQuery(tx, 'ALTER TABLE cards ADD spacingUnit INTEGER'),
                            this.runQuery(tx, 'ALTER TABLE cards ADD resistivityUnit INTEGER'),
                        ])
                    case 1:
                        return await this.runMultiQueryTransaction(tx => [
                            //to v2
                            this.runQuery(tx, 'ALTER TABLE potentials ADD timeModified INTEGER'),
                            this.runQuery(tx, 'ALTER TABLE potentialTypes ADD isAc BOOLEAN DEFAULT 0'),
                            this.runQuery(tx, 'ALTER TABLE circuits ADD enclosureType INTEGER'),
                            this.runQuery(tx, 'ALTER TABLE circuits ADD bedType INTEGER'),
                            this.runQuery(tx, 'ALTER TABLE circuits ADD materialType INTEGER'),
                            this.runQuery(tx, 'ALTER TABLE cards ADD spacingUnit INTEGER'),
                            this.runQuery(tx, 'ALTER TABLE cards ADD resistivityUnit INTEGER'),
                            this.runQuery(tx, `ALTER TABLE circuits ADD type TEXT DEFAULT ${SubitemTypes.CIRCUIT}`),
                        ])
                }

            }
            catch (er) {
                //no Errros thrown while adjusting schemas
            }
    }

    async fullResetDevOnly() {
        try {
            await super.runMultiQueryTransaction(tx => [
                super.runQuery(tx, 'DROP TABLE IF EXISTS potentials', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS sides', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS cards', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS assets', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS circuits', []),
                super.runQuery(tx, `DROP TABLE IF EXISTS survey`, []),
                super.runQuery(tx, `DROP TABLE IF EXISTS schemaVersion`, []),
                super.runQuery(tx, `DROP TABLE IF EXISTS testPoints`, []),
                super.runQuery(tx, `DROP TABLE IF EXISTS rectifiers`, []),
                super.runQuery(tx, `DROP TABLE IF EXISTS pipelines`, []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS referenceCells', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS calculators', []),
                super.runQuery(tx, `DROP TABLE IF EXISTS potentialTypes`, []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS settings', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS mapLayers', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS defaultNames', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS config', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS soilResistivityLayers', []),
                super.runQuery(tx, 'DROP TABLE IF EXISTS anodeBedAnodes', []),
            ])
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to reset database tables', er)
        }
    }

}
