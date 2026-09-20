export class UpdateLocale {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute(locale) {
        return await this.settingRepo.updateLocale(locale)
    }
}
