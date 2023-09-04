import { SQLiteRepository } from "../../utils/SQLite"
import { Pipeline } from "../../entities/survey/items/Pipeline"
import { Error, errors } from "../../utils/Error"
import { ItemResponseProcessor } from "./utils/ItemResponseProcessor"
import { ItemTypes } from "../../../constants/global"

export class PipelineRepository extends SQLiteRepository {
    constructor() {
        super()
        this.responseProcessor = new ItemResponseProcessor()
        this.tableName = 'pipelines'
        this.subitemTable = 'cards'
    }

    async getIdList(sorting) {
        try {
            const sortingQuery = this.responseProcessor.sortingQuery(sorting)
            const result = await super.runSingleQueryTransaction(`SELECT id FROM pipelines ${sortingQuery}`, [])
            return super.generateArray(result.rows.length, result.rows.item).map(row => row.id)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get pipelines id list with sorting ${sorting}`, err)
        }
    }

    async getDisplayList(idList) {
        try {
            const result = await this.runSingleQueryTransaction(
                `SELECT id AS itemId, name AS itemName, timeModified, uid AS itemUid, material FROM pipelines WHERE id IN ${this.convertArrayToInStatement(idList)}`)
            return this.responseProcessor.generateDisplayCardList(result, idList, ItemTypes.PIPELINE)
        }
        catch (err) {
            throw new Error(errors.DATABASE, 'Unable to get pipeline display list', err)
        }
    }

    async getById(idList) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT pipelines.*, COUNT(DISTINCT cards.testPointId) AS tpCount 
                FROM pipelines 
                LEFT JOIN cards 
                ON pipelines.id = cards.pipelineId 
                WHERE pipelines.id IN ${super.convertArrayToInStatement(idList)}`)
            return this.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, tpCount }) =>
                    new Pipeline(id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, tpCount))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get pipeline with id ${idList.join()}`, err)
        }
    }

    async create(pipeline) {
        try {
            const { id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, tpCount } = pipeline
            const result = await super.runSingleQueryTransaction(
                `INSERT INTO ${this.tableName} (id, uid, timeCreated, name, timeModified, nps, material, coating, licenseNumber, product, comment) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                [id, uid, timeCreated, name, timeModified, nps, material, Number(coating), licenseNumber, product, comment])
            return new Pipeline(result.insertId, uid, name, timeCreated, timeModified, comment, nps, material, Boolean(coating), licenseNumber, product, tpCount)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to create pipeline with name ${name}.`, err)
        }
    }

    async createAll(pipelines) {
        try {
            await super.runSingleQueryTransaction(
                `INSERT INTO pipelines (id, uid, timeCreated, name, timeModified, nps, material, coating, licenseNumber, product, comment) VALUES ${pipelines.map(pipelines.map(() => '(?,?,?,?,?,?,?,?,?,?,?)')).join(', ')}`,
                pipelines.map(({ id, uid, timeCreated, name, timeModified, nps, material, coating, licenseNumber, product, comment }) => [id, uid, timeCreated, name, timeModified, nps, material, coating, licenseNumber, product, comment]).flat(0))
            return
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to create pipeline with name ${name}.`, err)
        }

    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${this.tableName} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Test point doesn't exist` // No Error if item not found seems logical 
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to delete pipeline with id ${id}`, err)
        }
    }

    async update(pipeline) {
        try {
            const { id, name, timeModified, comment, nps, material, coating, licenseNumber, product } = pipeline
            const result = await super.runSingleQueryTransaction(
                `UPDATE pipelines SET name=?, nps=?, material=?, coating=?, licenseNumber=?, timeModified=?, product=?, comment=? WHERE id=?`,
                [name, nps, material, coating, licenseNumber, timeModified, product, comment, id])
            if (result.rowsAffected === 0)
                throw 'Pipeline not found'
            else return pipeline

        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to update pipeline with id ${id}`, err)
        }
    }

    async getAll() { //tpCount not implemented
        try {
            const result = await super.runSingleQueryTransaction(`SELECT *, 0 AS tpCount from ${this.tableName}`, [])
            return this.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, tpCount }) =>
                    new Pipeline(id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, tpCount))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get pipeline list`, err)
        }
    }
}
