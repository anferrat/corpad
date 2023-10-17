import { MapLayer } from "../../entities/survey/other/MapLayer";
import { Error, errors } from "../../utils/Error";
import { SQLiteRepository } from "../../utils/SQLite";

export class MapLayerRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async getById(id) {
        try {
            const result = await this.runSingleQueryTransaction('SELECT * from mapLayers WHERE id=?', [id])
            const { uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible } = result.rows.item(0)
            return new MapLayer(id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, Boolean(visible))
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to get mapLayer', er)
        }
    }

    async update(mapLayer) {
        try {
            const { id, name, comment, timeModified, strokeColor, strokeWidth, fillColor, visible } = mapLayer
            await this.runSingleQueryTransaction('UPDATE mapLayers SET  name=?, comment=?, timeModified=?, strokeColor=?, strokeWidth=?, fillColor=?, visible=? WHERE id=?', [name, comment, timeModified, strokeColor, strokeWidth, fillColor, visible, id])
            return mapLayer
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to update map layer', er)
        }
    }

    async create(mapLayer) {
        try {
            const { id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible } = mapLayer
            const result = await this.runSingleQueryTransaction('INSERT INTO mapLayers (id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible])
            return new MapLayer(result.insertId, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible)
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to create map layer', er)
        }
    }

    async delete(id) {
        try {
            await this.runSingleQueryTransaction('DELETE FROM mapLayers WHERE id=?', [id])
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to delete mapLayer', er)
        }
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT * from mapLayers LIMIT 6')
            return this.generateArray(result.rows.length, result.rows.item).map(({ id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, visible }) =>
                new MapLayer(id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, data, Boolean(visible)))
        }
        catch (er) {
            throw new Error(errors.DATABASE, 'Unable to get mapLayers', er)
        }
    }
}