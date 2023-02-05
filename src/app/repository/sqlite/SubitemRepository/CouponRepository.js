import { SQLiteRepository } from "../../../utils/SQLite"
import { SubitemTypes } from "../../../entities/survey/subitems/Subitem"
import { Coupon } from "../../../entities/survey/subitems/Coupon"
import { Error } from "../../../utils/Error"


export class CouponRepository extends SQLiteRepository {
    constructor() {
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
                'INSERT INTO cards (uid, testPointId, type, name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge) VALUES (?,?,?,?,?,?,?,?,?,?,?',
                [uid, parentId, type, name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge])
            return new Coupon(result.insertId, parentId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area)
        }
        catch (err) {
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
            throw new Error(`DatabaseError', 'Unable to get coupon with id ${id}`, err)
        }
    }


    async update(coupon) {
        const { id, name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge } = coupon
        try {
            const result = await this.runSingleQueryTransaction(
                'UPDATE cards SET name=?, pipelineCardId=?, couponType=?, current=?, density=?, area=?, wireColor=?, wireGauge=? WHERE id=?',
                [name, pipelineCardId, couponType, current, density, area, wireColor, wireGauge, id])
            if (result.rowsAffected === 0)
                throw 'Item not found'
            else return coupon
        }
        catch (err) {
            throw new Error('DatabaseError', `Unable to update coupon with id ${id}`, err)
        }
    }
}