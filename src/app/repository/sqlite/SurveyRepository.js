import { SQLiteRepository } from "../../utils/SQLite"
import { Error, errors } from "../../utils/Error"
import { SurveyItem } from "../../entities/survey/items/SurveyItem"
import { ItemTypes } from "../../../constants/global"
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
            //kinda design problem. Null name values can appear when creating new items and exiting app withouht saving, so we delete those on app load
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
        boolConverter - important to wrap Boolean values before inserting to database. Null is legit option for boolean values when field is not used (cards table). Bool values stored as 0 and 1
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
            console.log(err)
            throw new Error(errors.DATABASE, `Unable to import survey file`, err)
        }
    }
}
