import { SQLiteRepository } from "../../utils/SQLite"
import { SubitemTypes } from "../../../constants/global"
import { Error, errors } from "../../utils/Error"
import { SubitemRepositoryFactory } from "./utils/SubitemRepositoryFactory"

export class SubitemRepository extends SQLiteRepository {
    constructor() {
        super()
        this.subitemRepoFactory = new SubitemRepositoryFactory()
    }

    async getAll() {
        return (await Promise.all(Object.values(SubitemTypes).map(subitemType => this.subitemRepoFactory.execute(subitemType).getAll()))).flat()
    }

    create(subitem) {
        return this.subitemRepoFactory.execute(subitem.type).create(subitem)
    }

    update(subitem, currentTime) {
        return this.subitemRepoFactory.execute(subitem.type).update(subitem, currentTime)
    }

    getByIdAndType(id, type) {
        return this.subitemRepoFactory.execute(type).getById(id)
    }

    async delete(itemId, subitemId, subitemType, currentTime) {
        try {
            const isRectifierItemType = subitemType === SubitemTypes.CIRCUIT || subitemType === SubitemTypes.ANODE_BED
            const subitemTable = isRectifierItemType ? 'circuits' : 'cards'
            const itemTable = isRectifierItemType ? 'rectifiers' : 'testPoints'
            const result = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `DELETE FROM ${subitemTable} WHERE id=?`, [subitemId]),
                this.runQuery(tx, `UPDATE ${itemTable} SET timeModified = ? WHERE id = ?`, [currentTime, itemId]),
            ])
            if (result.rowsAffected === 0)
                return // throw `Subitem doesn't exist` // Silently fail if item not found
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to delete subitem of type ${subitemType} with id ${subitemId}`, err)
        }
    }
}
