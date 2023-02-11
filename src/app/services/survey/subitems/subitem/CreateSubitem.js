import { guid } from "../../../../utils/guid"
import { SubitemTypes } from "../../../../entities/survey/subitems/Subitem"
import { Anode } from "../../../../entities/survey/subitems/Anode"
import { PipelineLead } from "../../../../entities/survey/subitems/PipelineLead"
import { StatReferenceCell } from "../../../../entities/survey/subitems/StatReferenceCell"
import { Coupon } from "../../../../entities/survey/subitems/Coupon"
import { Bond } from "../../../../entities/survey/subitems/Bond"
import { Shunt } from "../../../../entities/survey/subitems/Shunt"
import { Riser } from "../../../../entities/survey/subitems/Riser"
import { Isolation } from "../../../../entities/survey/subitems/Isolation"
import { Structure } from "../../../../entities/survey/subitems/Structure"
import { TestLead } from "../../../../entities/survey/subitems/TestLead"
import { Circuit } from "../../../../entities/survey/subitems/Circuit"
import { Error } from "../../../../utils/Error"

export class CreateSubitem {
    constructor (subitemRepo, basicPresenter) {
        this.subitemRepo = subitemRepo
        this.basicPresenter = basicPresenter
    }

    _getSubitemByType(subitemType, parentId, uid) {
        switch (subitemType) {
            case SubitemTypes.ANODE:
                return new Anode(null, parentId, uid, null, null, null, null)
            case SubitemTypes.PIPELINE:
                return new PipelineLead(null, parentId, uid, null, null, null, null)
            case SubitemTypes.REFERENCE_CELL:
                return new StatReferenceCell(null, parentId, uid, null, null, null, null)
            case SubitemTypes.COUPON:
                return new Coupon(null, parentId, uid, null, null, null, null, null, null, null, null)
            case SubitemTypes.BOND:
                return new Bond(null, parentId, uid, null, true, null, [], [])
            case SubitemTypes.SHUNT:
                return new Shunt(null, parentId, uid, null, null, null, null, false, null, null, true, [], [])
            case SubitemTypes.RISER:
                return new Riser(null, parentId, uid, null, null, null)
            case SubitemTypes.ISOLATION:
                return new Isolation(null, parentId, uid, null, true, null, null, null, [], [])
            case SubitemTypes.STRUCTURE:
                return new Structure(null, parentId, uid, null, null)
            case SubitemTypes.TEST_LEAD:
                return new TestLead(null, parentId, uid, null, null, null)
            case SubitemTypes.CIRCUIT:
                return new Circuit(null, parentId, uid, name, null, null, null, null, null, null, null)
            default: throw new Error('CorpadError', `Unable to create subitem of type ${subitemType}`)
        }
    }

    async execute(subitemType, parentId) {
        const uid = guid()
        const subitem = this._getSubitemByType(subitemType, parentId, uid)
        return this.basicPresenter.execute(await this.subitemRepo.create(subitem))
    }
}