import { SQLiteRepository } from "../../utils/SQLite"
import { Pipeline } from "../../entities/survey/items/Pipeline"
import { Error } from "../../utils/Error"

export class PipelineRepository extends SQLiteRepository {
    constructor() {
        super()
        this.tableName = 'pipelines'
        this.subitemTable = 'cards'
    }

    async getIdList(sorting) {
        try {
            const sortingQuery = super.getSortingQuery(sorting)
            const result = await super.runSingleQueryTransaction(`SELECT id, name FROM ${this.tableName}${sortingQuery}`, [])
            return super.generateArray(result.rows.length, result.rows.item).map(row => row.id)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get pipelines id list with sorting ${sorting}`, err)
        }
    }

    async getNameList() {
        try {
            const result = await super.runSingleQueryTransaction(`SELECT id, name FROM ${this.tableName}`, [])
            return super.generateArray(result.rows.length, result.rows.item).map(row => row.id)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get pipelines name list`, err)
        }
    }

    async getById(id) {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT *.${this.tableName}, COUNT(DISTINCT ${this.subitemTable}.testPointId) AS tpCount 
                FROM ${this.tableName} 
                LEFT OUTER JOIN ${this.subitemTable} 
                ON ${this.tableName}.id = ${this.subitemTable}.pipelineId 
                WHERE ${this.tableName}.id = ? LIMIT 1`, [id])
            const { uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, tpCount } = result.rows.item(0)
            return new Pipeline(id, uid, name, timeCreated, timeModified, comment, nps, material, coating, licenseNumber, product, tpCount)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get pipeline with id ${id}`, err)
        }
    }

    async create({ uid, name, currentTime, comment, nps, material, coating, licenseNumber, product, tpCount }) {
        if (uid && currentTime) {
            try {

                const result = await super.runSingleQueryTransaction(
                    `INSERT INTO ${this.tableName} (uid, timeCreated, name, timeModified, nps, material, coating, licenseNumber, product, comment) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                    [uid, currentTime, name, currentTime, nps, material, coating, licenseNumber, product, comment])
                return new Pipeline(result.insertId, uid, name, currentTime, currentTime, comment, nps, material, coating, licenseNumber, product, tpCount)
            }
            catch (err) {
                throw new Error('DatabaseError', `Unable to create pipeline with name ${name}.`, err)
            }
        }
        else throw new Error('CorpadError', `Unable to create pipeline without required minimum parameters. Name: ${name}, uid: ${uid}, currentTime: ${currentTime}`)
    }

    async delete(id) {
        try {
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${this.tableName} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Test point doesn't exist` // No Error if item not found seems logical
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to delete pipeline with id ${id}`, err)
        }
    }

    async update({ id, name, timeModified, comment, nps, material, coating, licenseNumber, product }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `UPDATE pipelines SET name=?, nps=?, material=?, coating=?, licenseNumber=?, timeModified=?, product=?, comment=? WHERE id=?`,
                [name, nps, material, coating, licenseNumber, timeModified, product, comment, id])
            if (result.rowsAffected === 0) {
                throw 'Pipeline not found'
            }
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update pipeline with id ${id}`, err)
        }
    }

    async updateProperty({ id, property, value, currentTime }) {
        try {
            const result = await super.runSingleQueryTransaction(
                `UPDATE ${this.tableName} SET ${property}=?, timeModified=? WHERE id=?`,
                [value, currentTime, id]
            )
            if (result.rowsAffected === 0) {
                throw 'Pipeline not found'
            }
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update property ${property} for pipeline with id ${id}`)
        }
    }
}
