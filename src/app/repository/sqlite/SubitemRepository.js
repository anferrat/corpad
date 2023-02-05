import { SQLiteRepository } from "../../utils/SQLite"
import { SubitemTypes } from "../../entities/survey/subitems/Subitem"
import { Error } from "../../utils/Error"
import { SubitemResponseProcessor } from "./utils/SubitemResponseProcessor"
import { SubitemRepositoryFactory } from "./utils/SubitemRepositoryFactory"

export class SubitemRepository extends SQLiteRepository {
    constructor() {
        super()
        this.responseProcessor = new SubitemResponseProcessor()
        this.subitemRepoFactory = new SubitemRepositoryFactory()
    }
    create(subitem) {
        return this.subitemRepoFactory.execute(subitem.type).create(subitem)
    }

    update(subitem) {
        return this.subitemRepoFactory.execute(subitem.type).update(subitem)
    }

    getByIdAndType(id, type) {
        return this.subitemRepoFactory.execute(type).getById(id)
    }

    async delete(id, type) {
        try {
            const subitemTable = type === SubitemTypes.CIRCUIT ? 'circuits' : 'cards'
            const result = await super.runSingleQueryTransaction(`DELETE FROM ${subitemTable} WHERE id=?`, [id])
            if (result.rowsAffected === 0)
                return // throw `Subitem doesn't exist` // Silently fail if item not found
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to delete subitem of type ${type} with id ${id}`, err)
        }
    }
}
