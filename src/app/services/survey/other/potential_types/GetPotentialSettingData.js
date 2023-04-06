export class GetPotentialSettingData {
    constructor(settingRepo, potentialTypeRepo, potentialTypePresenter) {
        this.settingRepo = settingRepo
        this.potentialTypeRepo = potentialTypeRepo
        this.potentialTypePresenter = potentialTypePresenter
    }

    async execute() {
        const [potentialTypes, settings] = await Promise.all([
            this.potentialTypeRepo.getAll(),
            this.settingRepo.get()
        ])
        return this.potentialTypePresenter.execute(potentialTypes, settings.autoCreatePotentials, settings.defaultPotentialUnit)
    }
}