export class GetLocale {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute() {
        return await this.settingRepo.getLocale()
    }
}
