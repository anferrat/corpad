import { Anode } from "../../../../entities/survey/subitems/Anode"
import { Bond } from "../../../../entities/survey/subitems/Bond"
import { Circuit } from "../../../../entities/survey/subitems/Circuit"
import { Coupon } from "../../../../entities/survey/subitems/Coupon"
import { Isolation } from "../../../../entities/survey/subitems/Isolation"
import { PipelineLead } from "../../../../entities/survey/subitems/PipelineLead"
import { Riser } from "../../../../entities/survey/subitems/Riser"
import { Shunt } from "../../../../entities/survey/subitems/Shunt"
import { StatReferenceCell } from "../../../../entities/survey/subitems/StatReferenceCell"
import { Structure } from "../../../../entities/survey/subitems/Structure"
import { SubitemTypes } from "../../../../entities/survey/subitems/Subitem"
import { TestLead } from "../../../../entities/survey/subitems/TestLead"
import { Error } from "../../../../utils/Error"

export class UpdateSubitem {
    constructor (subitemRepo, subitemPresenter) {
        this.subitemRepo = subitemRepo
        this.subitemPresenter = subitemPresenter
    }

    _createSubitemFromData(id, uid, name, type, parentId, data) {
        switch (type) {
            case SubitemTypes.ANODE:
                return new Anode(id, parentId, uid, name, data.anodeMaterial, data.wireGauge, data.wireColor)
            case SubitemTypes.BOND:
                return new Bond(id, parentId, uid, name, data.fromAtoB, data.current, data.sideA, data.sideB)
            case SubitemTypes.CIRCUIT:
                return new Circuit(id, parentId, uid, name, data.ratioCurrent, data.ratioVolatge, data.targetMin, data.targetMax, data.current, data.voltage, data.voltageDrop)
            case SubitemTypes.COUPON:
                return new Coupon(id, parentId, uid, name, data.pipelineCardId, data.wireGauge, data.wireColor, data.couponType, data.current, data.density, data.area)
            case SubitemTypes.ISOLATION:
                return new Isolation(id, parentId, uid, name, data.fromAtoB, data.isolationType, data.shorted, data.current, data.sideA, data.sideB)
            case SubitemTypes.PIPELINE:
                return new PipelineLead(id, parentId, uid, name, data.pipelineId, data.wireGauge, data.wireColor)
            case SubitemTypes.REFERENCE_CELL:
                return new StatReferenceCell(id, parentId, uid, name, data.rcType, data.wireGauge, data.wireColor)
            case SubitemTypes.RISER:
                return new Riser(id, parentId, uid, name, data.pipelineId, data.nps)
            case SubitemTypes.SHUNT:
                return new Shunt(id, parentId, uid, name, data.factor, data.ratioVoltage, data.ratioCurrent, data.factorSelected, data.current, data.voltageDrop, data.fromAtoB, data.sideA, data.sideB)
            case SubitemTypes.STRUCTURE:
                return new Structure(id, parentId, uid, name, data.description)
            case SubitemTypes.TEST_LEAD:
                return new TestLead(id, parentId, uid, name, data.wireGauge, data.wireColor)
            default: throw new Error('CorpadError', `Unable to update subitem with type ${type}`)
        }
    }


    async execute(subitemData) {
        const { id, uid, parentId, type, name } = subitemData
        const currentTime = Date.now()
        const subitem = this._createSubitemFromData(id, uid, name, type, parentId, subitemData)
        return this.subitemPresenter.executeWithUpdate(await this.subitemRepo.update(subitem, currentTime), currentTime)
    }
}