import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Error } from "../../../utils/Error"
import { StatReferenceCell } from "../../../entities/survey/subitems/StatReferenceCell"


export class StatRefrenceCellRepository extends SQLiteRepository {
    constructor () {
        super()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT id, testPointId, uid, name, rcType, wireColor, wireGauge FROM cards WHERE type=?', [SubitemTypes.REFERENCE_CELL])
            return this.generateArray(result.rows.length, result.rows.item)
                .map(({ id, uid, name, rcType, wireColor, wireGauge, testPointId }) =>
                    new StatReferenceCell(id, testPointId, uid, name, rcType, wireGauge, wireColor))
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get all reference cells`, err)
        }
    }

    async create(referenceCell) {
        const { uid, parentId, type, name, rcType, wireGauge, wireColor } = referenceCell
        try {
            const result = await this.runSingleQueryTransaction('INSERT INTO cards (uid, type, testPointId, name, rcType, wireGauge, wireColor) VALUES (?,?,?,?,?,?,?)',
                [uid, type, parentId, name, rcType, wireGauge, wireColor])
            return new StatReferenceCell(result.insertId, parentId, uid, name, rcType, wireGauge, wireColor)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to create referenceCell`, err)
        }
    }

    async getById(id) {
        try {
            const result = await this.runSingleQueryTransaction('SELECT testPointId, type, uid, name, rcType, wireColor, wireGauge FROM cards WHERE id=? AND type=?', [id, SubitemTypes.REFERENCE_CELL])
            const { uid, name, rcType, wireColor, wireGauge, testPointId } = result.rows.item(0)
            return new StatReferenceCell(id, testPointId, uid, name, rcType, wireGauge, wireColor)
        }
        catch (err) {
            throw new Error(`DatabaseError`, `Unable to get reference cell with id ${id}`, err)
        }
    }

    async update(referenceCell, currentTime) {
        const { id, parentId, name, rcType, wireGauge, wireColor } = referenceCell
        try {
            const result = await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, 'UPDATE cards SET name=?, rcType=?, wireColor=?, wireGauge=? WHERE id=?', [name, rcType, wireColor, wireGauge, id]),
                this.runQuery(tx, 'UPDATE testPoints SET timeModified=? WHERE id=?', [currentTime, parentId])
            ])
            if (result[0].rowsAffected === 0)
                throw 'Item not found'
            else return referenceCell
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update referenceCell with id ${id}`, err)
        }
    }

}