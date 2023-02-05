import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Error } from "../../../utils/Error"
import { Structure } from "../../../entities/survey/subitems/Structure"


export class StructureRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT id, testPointId, uid, name, description FROM cards WHERE type=?', [SubitemTypes.STRUCTURE])
            return this.generateArray(result.rows.length, result.rows.item)
                .map(({ id, testPointId, uid, name, description }) =>
                    new Structure(id, testPointId, uid, name, description))
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get all structures`, err)
        }
    }

    async create(structure) {
        const { uid, parentId, type, name, description } = structure
        try {
            const result = await this.runSingleQueryTransaction('INSERT INTO cards VALUES (uid, testPointId, type, name, description) VALUES (?,?,?,?,?)',
                [uid, parentId, type, name, description])
            return new Structure(result.insertId, parentId, uid, name, description)
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to create structure`, err)
        }
    }

    async getById(id) {
        try {
            const result = await this.runSingleQueryTransaction('SELECT testPointId, uid, name, description FROM cards WHERE id=? AND type=?', [id, SubitemTypes.STRUCTURE])
            const { testPointId, uid, name, description } = result.rows.item(0)
            return new Structure(id, testPointId, uid, name, description)
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get structure with id ${id}`, err)
        }
    }

    async update(structure) {
        const { id, name, description } = structure
        try {
            const result = await this.runSingleQueryTransaction('UPDATE cards SET name=?, description=? WHERE id=?', [name, description, id])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return structure
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update structure with id ${id}`, err)
        }
    }

}