import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Anode } from "../../../entities/survey/subitems/Anode"
import { Error } from "../../../utils/Error"

export class AnodeRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT id, testPointId, uid, name, anodeMaterial, wireColor, wireGauge FROM cards WHERE type=?', [SubitemTypes.ANODE])
            return this.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, name, anodeMaterial, wireColor, wireGauge, testPointId }) =>
                    new Anode(id, testPointId, uid, name, anodeMaterial, wireGauge, wireColor))
        }
        catch (er) {
            throw new Error('DatabaseError', 'Unable to get anodes', er)
        }
    }

    async create(anode) {
        const { uid, parentId, name, type, anodeMaterial, wireGauge, wireColor } = anode
        try {
            const result = await this.runSingleQueryTransaction('INSERT INTO cards (uid, type, testPointId, name, anodeMaterial, wireGauge, wireColor) VALUES (?,?,?,?,?,?,?)',
                [uid, type, parentId, name, anodeMaterial, wireGauge, wireColor])
            return new Anode(result.insertId, parentId, uid, name, anodeMaterial, wireGauge, wireColor)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to create anode`, err)
        }
    }

    async getById(id) {
        try {
            const result = await this.runSingleQueryTransaction('SELECT testPointId, uid, name, anodeMaterial, wireColor, wireGauge FROM cards WHERE id=? AND type=?', [id, SubitemTypes.ANODE])
            const { uid, name, anodeMaterial, wireColor, wireGauge, testPointId } = result.rows.item(0)
            return new Anode(id, testPointId, uid, name, anodeMaterial, wireGauge, wireColor)
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get anode with id ${id}`, err)
        }
    }


    async update(anode) {
        const { id, name, anodeMaterial, wireGauge, wireColor } = anode
        try {
            const result = await this.runSingleQueryTransaction('UPDATE cards SET name=?, anodeMaterial=?, wireColor=?, wireGauge=? WHERE id=?', [name, anodeMaterial, wireColor, wireGauge, id])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return anode
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update anode with id ${id}`, err)
        }
    }
}