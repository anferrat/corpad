import { guid } from "../../../../utils/guid"
import { SubitemTypes, PermanentPotentialTypes } from "../../../../../constants/global"
import { Potential } from "../../../../entities/survey/subitems/Potential"

export class CreateSubitem {
    constructor(subitemRepo, basicPresenter, subitemFactory, settingRepo, referenceCellRepo, potentialTypeRepo, potentialRepo) {
        this.subitemRepo = subitemRepo
        this.basicPresenter = basicPresenter
        this.subitemFactory = subitemFactory
        this.settingRepo = settingRepo
        this.referenceCellRepo = referenceCellRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.potentialRepo = potentialRepo
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
        const subitem = this.subitemFactory.execute(null, uid, null, subitemType, parentId)
        const { autoCreatePotentials } = await this.settingRepo.get()
        const created = await this.subitemRepo.create(subitem)
        if (autoCreatePotentials && ~SUBITEMS_WITH_POTENTIALS.indexOf(subitemType))
            await this._autoCreatePotentials(created.id)
        return this.basicPresenter.execute(created)
    }
}