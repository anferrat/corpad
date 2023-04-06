import { SQLiteRepository } from "../../utils/SQLite"
import { SubitemTypes } from "../../entities/survey/subitems/Subitem"
import { Error } from "../../utils/Error"
import { SubitemResponseProcessor } from "./utils/SubitemResponseProcessor"
import { SubitemRepositoryFactory } from "./utils/SubitemRepositoryFactory"
import { SubitemPropertyUpdateTypes } from "../../entities/survey/other/properties"

export class SubitemRepository extends SQLiteRepository {
    constructor() {
        super()
        this.responseProcessor = new SubitemResponseProcessor()
        this.subitemRepoFactory = new SubitemRepositoryFactory()
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
            const subitemTable = subitemType === SubitemTypes.CIRCUIT ? 'circuits' : 'cards'
            const itemTable = subitemType === SubitemTypes.CIRCUIT ? 'rectifiers' : 'testPoints'
            const result = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `DELETE FROM ${subitemTable} WHERE id=?`, [subitemId]),
                this.runQuery(tx, `UPDATE ${itemTable} SET timeModified = ? WHERE id = ?`, [currentTime, itemId]),
            ])
            if (result.rowsAffected === 0)
                return // throw `Subitem doesn't exist` // Silently fail if item not found
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to delete subitem of type ${subitemType} with id ${subitemId}`, err)
        }
    }


    async updateProperty(id, parentId, propertyType, subitemType, value, currentTime) {
        try {
            const getUpdateQuery = (propertyType) => {
                switch (propertyType) {
                    case SubitemPropertyUpdateTypes.CURRENT:
                        if (subitemType === SubitemTypes.CIRCUIT)
                            return `UPDATE circuits SET current = ${value} WHERE id = ${id}`
                        else return `UPDATE cards SET current = ${value} WHERE id = ${id} AND type = "${subitemType}"`
                    case SubitemPropertyUpdateTypes.SHORTED:
                        return `UPDATE cards SET shorted = ${Number(value)} WHERE id = ${id} AND type = "${subitemType}"`
                    case SubitemPropertyUpdateTypes.VOLTAGE:
                        return `UPDATE circuits SET voltage = ${value} WHERE id = ${id}`
                    case SubitemPropertyUpdateTypes.VOLTAGE_DROP:
                        return `UPDATE cards SET voltageDrop = ${value} WHERE id = ${id} AND type = "${subitemType}"`
                    default:
                        throw 'No such property to update'
                }
            }
            const parentTable = subitemType === SubitemTypes.CIRCUIT ? 'rectifiers' : 'testPoints'
            await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, getUpdateQuery(propertyType)),
                this.runQuery(tx, `UPDATE ${parentTable} SET timeModified = ${currentTime} WHERE id = ${parentId} `)
            ])
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update property ${propertyType}`)
        }
    }
}
