import { CurrentUnits } from "../other/properties";
import { Subitem } from "./Subitem";

export class Coupon extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, pipelineCardId, wireGauge, wireColor, couponType, current, density, area) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
        this.pipelineCardId = pipelineCardId
        this.wireColor = wireColor
        this.wireGauge = wireGauge
        this.couponType = couponType
        this.current = current
        this.currentUnit = CurrentUnits.MICRO_AMPS
        this.density = density
        this.area = area
    }
}

