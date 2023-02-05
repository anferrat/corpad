import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { PipelineLead } from "../../../entities/survey/subitems/PipelineLead"
import { Error } from "../../../utils/Error"

export class PipelineLeadRepository extends SQLiteRepository {
    constructor() {
        super()
    }


    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT id, testPointId, uid, name, pipelineId, wireColor, wireGauge FROM cards WHERE type=?', [SubitemTypes.PIPELINE])
            return this.generateArray(result.rows.length, result.rows.item).map(({ id, uid, name, pipelineId, wireColor, wireGauge, testPointId }) =>
                new PipelineLead(id, testPointId, uid, name, pipelineId, wireGauge, wireColor))
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get all pipeline leads`, err)
        }
    }

    async create(pipelineLead) {
        const { uid, parentId, name, pipelineId, wireGauge, wireColor, type } = pipelineLead
        try {
            const result = await this.runSingleQueryTransaction('INSERT INTO cards (uid, testPointId, type, name, pipelineId, wireGauge, wireColor) VALUES (?,?,?,?,?,?,?)',
                [uid, parentId, type, name, pipelineId, wireGauge, wireColor])
            return new PipelineLead(result.insertId, parentId, uid, name, pipelineId, wireGauge, wireColor)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to create pipeline lead`, err)
        }
    }

    async getById(id) {
        try {
            const result = await this.runSingleQueryTransaction('SELECT testPointId uid, name, pipelineId, wireColor, wireGauge FROM cards WHERE id=? AND type=?', [id, SubitemTypes.PIPELINE])
            const { uid, name, pipelineId, wireColor, wireGauge, testPointId } = result.rows.item(0)
            return new PipelineLead(id, testPointId, uid, name, pipelineId, wireGauge, wireColor)
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get pipeline lead with id ${id}`, err)
        }
    }


    async update(pipelineLead) {
        const { id, name, pipelineId, wireGauge, wireColor } = pipelineLead
        try {
            const result = await this.runSingleQueryTransaction('UPDATE cards SET name=?, pipelineId=?, wireColor=?, wireGauge=? WHERE id=?', [name, pipelineId, wireColor, wireGauge, id])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return pipelineLead
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update pipeline lead with id ${id}`, err)
        }
    }
}