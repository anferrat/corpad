export class UpdatePotentialUnit {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute(unit) {
        return await this.settingRepo.updatePotentialUnit(unit)
    }
}