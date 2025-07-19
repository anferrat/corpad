import { PermanentPotentialTypes } from "../../../../../constants/global"

export class GetPotentialList {
    constructor(potentialRepo, potentialTypeRepo, referenceCellRepo, settingRepo, potentialPresenter, convertPotentialUnits) {
        this.potentialRepo = potentialRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.referenceCellRepo = referenceCellRepo
        this.settingRepo = settingRepo
        this.potentialPresenter = potentialPresenter
        this.convertPotentialUnits = convertPotentialUnits
    }

    _getAcTypeId(potentialTypes) {
        const index = potentialTypes.findIndex(({ type }) => type === PermanentPotentialTypes.AC)
        return ~index ? potentialTypes[index].id : null
    }

    async execute(subitemId, itemId) {
        const [potentialTypes, referenceCells, potentials, settings] = await Promise.all([
            this.potentialTypeRepo.getAll(),
            this.referenceCellRepo.getAllForItem(itemId, subitemId),
            this.potentialRepo.getBySubitemId(subitemId),
            this.settingRepo.get()
        ])
        const acTypeId = this._getAcTypeId(potentialTypes)

        const convertedPotentials = this.convertPotentialUnits.execute(potentials, settings.defaultPotentialUnit, acTypeId, false)

        return this.potentialPresenter.executeWithList(convertedPotentials, potentialTypes, referenceCells, settings.defaultPotentialUnit)
    }
}