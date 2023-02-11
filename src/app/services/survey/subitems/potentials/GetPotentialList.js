export class GetPotentialList {
    constructor (potentialRepo, potentialTypeRepo, referenceCellRepo, settingRepo, potentialPresenter) {
        this.potentialRepo = potentialRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.referenceCellRepo = referenceCellRepo
        this.settingRepo = settingRepo
        this.potentialPresenter = potentialPresenter
    }

    async execute(subitemId, itemId) {
        const [potentialTypes, referenceCells, potentials, settings] = await Promise.all([
            this.potentialTypeRepo.getAll(),
            this.referenceCellRepo.getAllForSubitem(subitemId, itemId),
            this.potentialRepo.getBySubitemId(subitemId),
            this.settingRepo.get()
        ])
        return this.potentialPresenter.executeWithList(potentials, potentialTypes, referenceCells, settings.defaultPotentialUnit)
    }
}