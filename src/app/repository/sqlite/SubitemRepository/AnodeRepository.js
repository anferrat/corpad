import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Anode } from "../../../entities/survey/subitems/Anode"
import { Error } from "../../../utils/Error"

export class AnodeRepository extends SQLiteRepository {
    constructor () {
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
            throw new Error(`DatabaseError`, `Unable to get anode with id ${id}`, err)
        }
    }


    async update(anode, currentTime) {
        const { id, name, parentId, anodeMaterial, wireGauge, wireColor } = anode
        try {
            const result = await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, 'UPDATE cards SET name=?, anodeMaterial=?, wireColor=?, wireGauge=? WHERE id=?', [name, anodeMaterial, wireColor, wireGauge, id]),
                this.runQuery(tx, 'UPDATE testPoints SET timeModified=? WHERE id = ?', [currentTime, parentId])
            ])
            if (result[0].rowsAffected === 0) 
            //not great. in case when update failed timeModified will be still updated. need to resolve query within transaction to find out if want to update the rest. leave it for now
                throw 'Item not found'
            else return anode
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update anode with id ${id}`, err)
        }
    }
}