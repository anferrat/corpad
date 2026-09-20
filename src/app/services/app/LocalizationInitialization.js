import { initializeLocalization } from '../../../localization'

export class LocalizationInitialization {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute() {
        const locale = await this.settingRepo.getLocale()
        return initializeLocalization(locale)
    }
}
