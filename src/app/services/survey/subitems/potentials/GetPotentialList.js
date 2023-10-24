export class GetPotentialList {
    constructor(potentialRepo, potentialTypeRepo, referenceCellRepo, settingRepo, potentialPresenter, convertPotentialUnits) {
        this.potentialRepo = potentialRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.referenceCellRepo = referenceCellRepo
        this.settingRepo = settingRepo
        this.potentialPresenter = potentialPresenter
        this.convertPotentialUnits = convertPotentialUnits
    }

    async execute(subitemId, itemId) {
        const [potentialTypes, referenceCells, potentials, settings] = await Promise.all([
            this.potentialTypeRepo.getAll(),
            this.referenceCellRepo.getAllForItem(itemId, subitemId),
            this.potentialRepo.getBySubitemId(subitemId),
            this.settingRepo.get()
        ])
        const convertedPotentials = this.convertPotentialUnits.execute(potentials, settings.defaultPotentialUnit, false)

        return this.potentialPresenter.executeWithList(convertedPotentials, potentialTypes, referenceCells, settings.defaultPotentialUnit)
    }
}