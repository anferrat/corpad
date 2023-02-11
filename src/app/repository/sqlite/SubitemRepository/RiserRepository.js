import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Error } from "../../../utils/Error"
import { Riser } from "../../../entities/survey/subitems/Riser"


export class RiserRepository extends SQLiteRepository {
    constructor () {
        super()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT id, testPointId, type, uid, name, pipelineId, nps FROM cards WHERE type=?', [SubitemTypes.RISER])
            return this.generateArray(result.rows.length, result.rows.item).map(({ id, testPointId, uid, name, pipelineId, nps }) =>
                new Riser(id, testPointId, uid, name, pipelineId, nps))
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get all risers`, err)
        }
    }

    async create(riser) {
        const { uid, parentId, type, name, pipelineId, nps, } = riser
        try {
            const result = await this.runSingleQueryTransaction('INSERT INTO cards (uid, testPointId, type, name, pipelineId, nps) VALUES (?,?,?,?,?,?)',
                [uid, parentId, type, name, pipelineId, nps])
            return new Riser(result.insertId, parentId, uid, name, pipelineId, nps)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to create riser`, err)
        }
    }

    async getById(id) {
        try {
            const result = await this.runSingleQueryTransaction('SELECT testPointId, uid, name, pipelineId, nps FROM cards WHERE id=? AND type=?', [id, SubitemTypes.RISER])
            const { testPointId, uid, name, pipelineId, nps } = result.rows.item(0)
            return new Riser(id, testPointId, uid, name, pipelineId, nps)
        }
        catch (err) {
            throw new Error(`DatabaseError`, `Unable to get riser with id ${id}`, err)
        }
    }

    async update(riser, currentTime) {
        const { id, name, pipelineId, nps, parentId } = riser
        try {
            const result = await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, 'UPDATE cards SET name=?, pipelineId=?, nps=? WHERE id=?', [name, pipelineId, nps, id]),
                this.runQuery(tx, 'UPDATE testPoints SET timeModified =? WHERE id =? ', [currentTime, parentId])
            ])
            if (result[0].rowsAffected === 0)
                throw 'Item not found'
            else return riser
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update riser with id ${id}`, err)
        }
    }

}