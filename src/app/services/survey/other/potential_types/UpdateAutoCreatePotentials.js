export class UpdateAutoCreatePotentials {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute(autoCreate) {
        return await this.settingRepo.updateAutoCreatePotentials(autoCreate)
    }
}