import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Coupon } from "../../../entities/survey/subitems/Coupon"
import { Error } from "../../../utils/Error"


export class CouponRepository extends SQLiteRepository {
    constructor () {
        super()
    }

    async getAll() {
        try {
            const result = await this.runSingleQueryTransaction('SELECT id, testPointId, uid, name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge FROM cards WHERE type=?', [SubitemTypes.COUPON])
            return this.generateArray(result.rows.length, result.rows.item)
                .map(({ id, testPointId, uid, name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge }) =>
                    new Coupon(id, testPointId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area))
        }
        catch (err) {
            throw new Error(`DatabaseError', 'Unable to get all coupons`, err)
        }
    }

    async create(coupon) {
        const { uid, parentId, type, name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge } = coupon
        try {
            const result = await this.runSingleQueryTransaction(
                'INSERT INTO cards (uid, testPointId, type, name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                [uid, parentId, type, name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge])
            return new Coupon(result.insertId, parentId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area)
        }
        catch (err) {
            console.log(err)
            throw new Error('DatabaseError', `Unable to create coupon`, err)
        }
    }

    async getById(id) {
        try {
            const result = await this.runSingleQueryTransaction('SELECT testPointId, uid, name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge FROM cards WHERE id=? AND type=?', [id, SubitemTypes.COUPON])
            const { testPointId, uid, name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge } = result.rows.item(0)
            return new Coupon(id, testPointId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area)
        }
        catch (err) {
            throw new Error(`DatabaseError`, `Unable to get coupon with id ${id}`, err)
        }
    }


    async update(coupon, currentTime) {
        const { id, name, parentId, pipelineCardId, couponType, current, density, area, wireColor, wireGauge } = coupon
        try {
            const result = await this.runMultiQueryTransaction(tx => [
                this.runQuery(tx, 'UPDATE cards SET name=?, pipelineCardId=?, couponType=?, current=?, density=?, area=?, wireColor=?, wireGauge=? WHERE id=?',
                    [name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge, id]),
                this.runQuery(tx, 'UPDATE testPoints SET timeModified=? WHERE id = ?', [currentTime, parentId])
            ])
            if (result[0].rowsAffected === 0)
                throw 'Item not found'
            else return coupon
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update coupon with id ${id}`, err)
        }
    }
}