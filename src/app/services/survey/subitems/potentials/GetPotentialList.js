import { Potential } from "../../../../entities/survey/subitems/Potential"

export class GetPotentialList {
    constructor (potentialRepo, potentialTypeRepo, referenceCellRepo, settingRepo, unitConverter, potentialPresenter) {
        this.potentialRepo = potentialRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.referenceCellRepo = referenceCellRepo
        this.settingRepo = settingRepo
        this.potentialPresenter = potentialPresenter
        this.unitConverter = unitConverter
    }

    async execute(subitemId, itemId) {
        const [potentialTypes, referenceCells, potentials, settings] = await Promise.all([
            this.potentialTypeRepo.getAll(),
            this.referenceCellRepo.getAllForItem(itemId, subitemId),
            this.potentialRepo.getBySubitemId(subitemId),
            this.settingRepo.get()
        ])

        potentials.forEach(({ value }, index) => {
            potentials[index].value = this.unitConverter.convertVolts(value, Potential.unit, settings.defaultPotentialUnit)
        })

        return this.potentialPresenter.executeWithList(potentials, potentialTypes, referenceCells, settings.defaultPotentialUnit)
    }
}