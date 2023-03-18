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
import { PermanentPotentialTypes } from "../../../../entities/survey/other/properties"
import { Potential } from "../../../../entities/survey/subitems/Potential"

export class CreateSubitem {
    constructor (subitemRepo, basicPresenter, subitemFactory, settingRepo, referenceCellRepo, potentialTypeRepo, potentialRepo) {
        this.subitemRepo = subitemRepo
        this.basicPresenter = basicPresenter
        this.subitemFactory = subitemFactory
        this.settingRepo = settingRepo
        this.referenceCellRepo = referenceCellRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.potentialRepo = potentialRepo
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

    _getPotentialIdByType(potentialTypes, permType) {
        const index = potentialTypes.findIndex(pt => pt.type === permType)
        return ~index ? potentialTypes[index].id : null
    }

    _createPotentialByPermType(subitemId, permType, potentialTypes, referenceCell) {
        const potentialTypeId = this._getPotentialIdByType(potentialTypes, permType)
        if (potentialTypeId !== null && referenceCell) {
            const potential = new Potential(null, guid(), subitemId, null, potentialTypeId, referenceCell.id, true)
            return this.potentialRepo.create(potential)
        }
        else return null
    }

    async _autoCreatePotentials(subitemId) {
        const autoCreatePotentialTypes = [PermanentPotentialTypes.ON, PermanentPotentialTypes.OFF]
        const mainReference = await this.referenceCellRepo.getMainReference()
        const potentialTypes = await this.potentialTypeRepo.getAll()
        await Promise.all(autoCreatePotentialTypes.map(permType => this._createPotentialByPermType(subitemId, permType, potentialTypes, mainReference)))
    }


    async execute(subitemType, parentId) {
        const SUBITEMS_WITH_POTENTIALS = [SubitemTypes.ANODE, SubitemTypes.COUPON, SubitemTypes.PIPELINE, SubitemTypes.REFERENCE_CELL, SubitemTypes.RISER, SubitemTypes.STRUCTURE, SubitemTypes.TEST_LEAD]
        const uid = guid()
        const subitem = this.subitemFactory.execute(null, uid, null, subitemType, parentId, {})
        const { autoCreatePotentials } = await this.settingRepo.get()
        const created = await this.subitemRepo.create(subitem)
        if (autoCreatePotentials && ~SUBITEMS_WITH_POTENTIALS.indexOf(subitemType))
            await this._autoCreatePotentials(created.id)
        return this.basicPresenter.execute(created)
    }
}