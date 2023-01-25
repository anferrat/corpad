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
}
