import { ItemTypes } from "../../../constants/global";
import { Asset } from "../../entities/survey/other/Asset";
import { Error, errors } from "../../utils/Error";
import { SQLiteRepository } from "../../utils/SQLite";

export class AssetRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async create(asset) {
        try {
            const { id, uid, comment, mediaType, fileName, timeCreated, timeModified, parentId, parentType } = asset
            const itemIdField = parentType === ItemTypes.TEST_POINT ? 'testPointId' : 'rectifierId'
            const parentTable = parentType === ItemTypes.TEST_POINT ? 'testPoints' : 'rectifiers'
            const [result] = await super.runMultiQueryTransaction(tx => ([
                super.runQuery(tx, `INSERT INTO assets (id, uid, comment, mediaType, fileName, timeCreated, timeModified, ${itemIdField}) VALUES (?,?,?,?,?,?,?,?)`, [id, uid, comment, mediaType, fileName, timeCreated, timeModified, parentId]),
                super.runQuery(tx, `UPDATE ${parentTable} SET timeModified=? WHERE id=?`, [timeCreated, parentId])
            ]))
            return new Asset(result.insertId, uid, comment, fileName, mediaType, timeCreated, timeModified, parentType, parentId)
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to create media asset.', er)
        }
    }

    async getByItemId(itemId, itemType) {
        try {
            const itemIdField = itemType === ItemTypes.TEST_POINT ? 'testPointId' : 'rectifierId'
            const result = await this.runSingleQueryTransaction(`SELECT * FROM assets WHERE ${itemIdField}=? ORDER BY timeModified`, [itemId])
            return this.generateArray(result.rows.length, result.rows.item).map(({ id, uid, comment, mediaType, fileName, timeCreated, timeModified }) =>
                new Asset(id, uid, comment, fileName, mediaType, timeCreated, timeModified, itemType, itemId))
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to get media assets for an item', er)
        }
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction(`SELECT * FROM assets`, [])
            return this.generateArray(result.rows.length, result.rows.item).map(({ id, uid, comment, mediaType, fileName, timeCreated, timeModified, testPointId, rectifierId }) => {
                const parentType = testPointId !== null ? ItemTypes.TEST_POINT : ItemTypes.RECTIFIER
                const parentId = testPointId !== null ? testPointId : rectifierId
                return new Asset(id, uid, comment, fileName, mediaType, timeCreated, timeModified, parentType, parentId)
            })
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to get all assets', er)
        }
    }

    async delete(id, parentType, parentId, currentTime) {
        try {
            const parentTable = parentType === ItemTypes.TEST_POINT ? 'testPoints' : 'rectifiers'
            await super.runMultiQueryTransaction(tx => ([
                super.runQuery(tx, 'DELETE FROM assets WHERE id=?', [id]),
                super.runQuery(tx, `UPDATE ${parentTable} SET timeModified=? WHERE id=?`, [currentTime, parentId])
            ]))
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to delete media asset', er)
        }
    }


}