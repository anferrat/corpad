import { SQLiteRepository } from "../../utils/SQLite"
import { Error } from "../../utils/Error"
import { ItemTypes } from "../../entities/survey/items/SurveyItem"
import { Marker } from "../../entities/survey/items/Marker"

export class MarkerRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async getAll() {
        try {
            const result = await super.runSingleQueryTransaction(
                `SELECT id, '${ItemTypes.TEST_POINT}' AS itemType, uid, status, testPointType, latitude, longitude, name, location, comment, timeCreated, timeModified FROM testPoints UNION ALL SELECT id, '${ItemTypes.RECTIFIER}' AS itemType, uid, status, NULL AS testPointType, latitude, longitude, name, location, comment, timeCreated, timeModified FROM rectifiers`, [])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, itemType, status, testPointType, latitude, longitude, name, location, comment, timeCreated, timeModifed }) =>
                    new Marker(id, uid, name, status, timeCreated, timeModifed, comment, itemType, testPointType, location, latitude, longitude))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to get get markers data`, err)
        }
    }

    async serach(string, limit) {
        try {
            const searchQuery = `WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND name LIKE '%${string}%'`
            const result = await super.runSingleQueryTransaction(
                `SELECT id, '${ItemTypes.TEST_POINT}' AS itemType, uid, status, testPointType, latitude, longitude, name, location, comment, timeCreated, timeModified FROM testPoints ${searchQuery} UNION ALL SELECT id, '${ItemTypes.RECTIFIER}' AS itemType, uid, status, NULL AS testPointType, latitude, longitude, name, location, comment, timeCreated, timeModified FROM rectifiers ${searchQuery} ORDER BY length(name) ASC LIMIT ${limit}`,
                [])
            return super.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, itemType, status, testPointType, latitude, longitude, name, location, comment, timeCreated, timeModifed }) =>
                    new Marker(id, uid, name, status, timeCreated, timeModifed, comment, itemType, testPointType, location, latitude, longitude))
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to serach for marker with search key ${string}`, err)
        }
    }
}
