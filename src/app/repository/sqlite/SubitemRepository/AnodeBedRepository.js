import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../../constants/global"
import { Error, errors } from "../../../utils/Error"
import { AnodeBedAnode } from "../../../entities/survey/subitems/AnodeBedAnode"
import { AnodeBed } from "../../../entities/survey/subitems/AnodeBed"


export class AnodeBedRepository extends SQLiteRepository {
    constructor() {
        super()
    }

    //Need to change to use subitemResponseProcessor instead to unify
    _generateAnodeBedArray(length, item) {
        let result = []
        let savedValue
        for (i = 0; i < length; i++) {
            let value = item(i)
            if (value?.id !== savedValue?.id) {
                if (savedValue)
                    result.push(savedValue)
                savedValue = { ...value, anodes: [] }
            }
            const { id, anodeId, anodeUid, current, wireColor, wireGauge } = value
            savedValue.anodes.push(new AnodeBedAnode(anodeId, anodeUid, id, current, wireColor, wireGauge))
            if (i === length - 1) {
                result.push(savedValue)
            }
        }
        return result
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction(
                `SELECT circuits.id, circuits.rectifierId, circuits.uid, circuits.name, circuits.enclosureType, circuits.bedType, circuits.materialType, anodeBedAnodes.id AS anodeId, anodeBedAnodes.uid AS anodeUid, anodeBedAnodes.current, anodeBedAnodes.wireColor, anodeBedAnodes.wireGauge 
                FROM circuits
                LEFT JOIN anodeBedAnodes ON 
                circuits.id = anodeBedAnodes.parentId
                WHERE circuits.type = ? 
                ORDER BY circuits.id, anodeId`, [SubitemTypes.ANODE_BED])
            return this._generateAnodeBedArray(result.rows.length, result.rows.item).map(
                ({ id, rectifierId, uid, name, enclosureType, bedType, materialType, anodes }) =>
                    new AnodeBed(id, rectifierId, uid, name, enclosureType, bedType, materialType, anodes))
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get all anode beds`, err)
        }
    }

    async create(anodeBed) {
        //Anode bed anode ids are not returned (cause they are not used) need to change if planning to access each anode individually by id)
        const { id, uid, parentId, name, type, enclosureType, bedType, materialType, anodes } = anodeBed
        if (anodes.length > 20)
            throw new Error(errors.DATABASE, 'Unable to create anode bed', 'Maximum number of andoes exeeded')
        try {
            const result = await super.runSingleQueryTransaction(`INSERT INTO circuits (id, uid, rectifierId, type, name, enclosureType, bedType, materialType) VALUES (?,?,?,?,?,?,?,?)`,
                [id, uid, parentId, type, name, enclosureType, bedType, materialType])
            if (anodes.length > 0)
                await super.runSingleQueryTransaction(`
                    INSERT INTO anodeBedAnodes (parentId, current, wireColor, wireGauge) VALUES
                    ${anodes.map(() => '(?,?,?,?)').join(', ')} `,
                    anodes.map(anode => [result.insertId, anode.current, anode.wireColor, anode.wireGauge]).flat())
            return new AnodeBed(result.insertId, parentId, uid, name, enclosureType, bedType, materialType, anodes)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to create anode bed`, err)
        }
    }

    async getById(anodeBedId) {
        try {
            const [result, anodeData] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `SELECT rectifierId, uid, name, enclosureType, bedType, materialType FROM circuits WHERE id = ? AND type = ?`, [anodeBedId, SubitemTypes.ANODE_BED]),
                this.runQuery(tx, `SELECT id, uid, current, wireColor, wireGauge FROM anodeBedAnodes WHERE parentId=?`, [anodeBedId]),
            ])
            const anodes = this.generateArray(anodeData.rows.length, anodeData.rows.item).map(({ id, uid, current, wireColor, wireGauge }) => new AnodeBedAnode(id, uid, anodeBedId, current, wireColor, wireGauge))
            const { rectifierId, uid, name, enclosureType, bedType, materialType } = result.rows.item(0)
            return new AnodeBed(anodeBedId, rectifierId, uid, name, enclosureType, bedType, materialType, anodes)
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to get anode bed with id ${anodeBedId}`, err)
        }
    }

    async update(anodeBed, currentTime) {
        const { id, parentId, name, enclosureType, bedType, materialType, anodes } = anodeBed
        if (anodes.length > 20)
            throw new Error(errors.DATABASE, 'Unable to create anode bed', 'Maximum number of andoes exeeded')
        try {
            const [result] = await super.runMultiQueryTransaction(tx => [
                this.runQuery(tx, `UPDATE circuits SET name=?, enclosureType=?, bedType=?, materialType=? WHERE id=?`, [name, enclosureType, bedType, materialType, id]),
                this.runQuery(tx, `UPDATE rectifiers SET timeModified=? WHERE id =?`, [currentTime, parentId]),
                this.runQuery(tx, `DELETE FROM anodeBedAnodes WHERE parentId = ?`, [id]),
                anodes.length > 0 ? this.runQuery(tx,
                    `INSERT INTO anodeBedAnodes (parentId, current, wireColor, wireGauge) VALUES
                    ${anodes.map(() => '(?,?,?,?)').join(', ')} `,
                    anodes.map(anode => [id, anode.current, anode.wireColor, anode.wireGauge]).flat()) : null
            ])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return anodeBed
        }
        catch (err) {
            throw new Error(errors.DATABASE, `Unable to update anode bed with id  ${id}`, err)
        }
    }
}