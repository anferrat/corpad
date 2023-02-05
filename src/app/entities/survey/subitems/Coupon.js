import { ItemTypes } from "../items/SurveyItem";
import { CurrentUnits } from "../other/properties";
import { Subitem, SubitemTypes } from "./Subitem";

export class Coupon extends Subitem {
    constructor(id, parentId, uid, name, pipelineCardId, wireGauge, wireColor, couponType, current, density, area) {
        super(id, parentId, uid, SubitemTypes.COUPON, ItemTypes.TEST_POINT, name)
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

