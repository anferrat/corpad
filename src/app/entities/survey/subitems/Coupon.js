import { ItemTypes, AreaUnits, CurrentUnits, SubitemTypes } from "../../../../constants/global"
import { Subitem } from "./Subitem"

export class Coupon extends Subitem {
    constructor(id, parentId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area, prevCurrent) {
        super(id, parentId, uid, SubitemTypes.COUPON, ItemTypes.TEST_POINT, name)
        this.pipelineCardId = pipelineCardId
        this.wireColor = wireColor
        this.wireGauge = wireGauge
        this.couponType = couponType
        this.current = current
        this.density = density
        this.area = area
        this.prevCurrent = prevCurrent
    }
    static areaUnit = AreaUnits.CENTIMETER_SQUARE
    static currentUnit = CurrentUnits.MICRO_AMPS
    //density unit also should be here

    calculate() {
        if (this.area && (this.current || this.current === 0)) {
            this.density = parseFloat((this.current / this.area * 0.1).toFixed(5))
        }
    }

    reset() {
        this.prevCurrent = this.current
        this.current = null
        this.density = null
    }

    setPipelineCardId(pipelineCardId) {
        this.pipelineCardId = pipelineCardId
    }
}

