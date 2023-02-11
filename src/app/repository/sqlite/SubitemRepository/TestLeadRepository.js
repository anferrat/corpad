import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Error } from "../../../utils/Error"
import { TestLead } from "../../../entities/survey/subitems/TestLead"


export class TestLeadRepository extends SQLiteRepository {
    constructor () {
        super()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT id, testPointId, uid, name, wireColor, wireGauge FROM cards WHERE type=?', [SubitemTypes.TEST_LEAD])
            return this.generateArray(result.rows.length, result.rows.item)
                .map(({ id, testPointId, type, uid, name, wireColor, wireGauge }) =>
                    new TestLead(id, testPointId, type, uid, name, wireColor, wireGauge))
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get test lead with id ${id}`, err)
        }
    }

    async create(testLead) {
        const { uid, parentId, type, name, wireColor, wireGauge } = testLead
        try {
            const result = await this.runSingleQueryTransaction('INSERT INTO cards (uid, testPointId, type, name, wireColor, wireGauge) VALUES (?,?,?,?,?,?)',
                [uid, parentId, type, name, wireColor, wireGauge])
            return new TestLead(result.insertId, parentId, uid, name, wireGauge, wireColor)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to create test lead`, err)
        }
    }


    async getById(id) {
        try {
            const result = await this.runSingleQueryTransaction('SELECT testPointId, uid, name, wireColor, wireGauge FROM cards WHERE id=? AND type=?', [id, SubitemTypes.TEST_LEAD])
            const { testPointId, uid, name, wireColor, wireGauge } = result.rows.item(0)
            return new TestLead(id, testPointId, uid, name, wireColor, wireGauge)
        }
        catch (err) {
            throw new Error(`DatabaseError`, `Unable to get test lead with id ${id}`, err)
        }
    }

    async update(testLead, currentTime) {
        const { id, name, wireColor, wireGauge, parentId } = testLead
        try {
            const result = await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, 'UPDATE cards SET name=?, wireColor=?, wireGauge=? WHERE id=?', [name, wireColor, wireGauge, id]),
                this.runQuery(tx, 'UPDATE testPoints SET timeModified=? WHERE id=?', [currentTime, parentId])
            ])
            if (result[0].rowsAffected === 0)
                throw 'Item not found'
            else return testLead
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update testLead with id ${id}`, err)
        }
    }

}