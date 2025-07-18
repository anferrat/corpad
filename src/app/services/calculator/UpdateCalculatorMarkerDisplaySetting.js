export class UpdateCalculatorMarkerDisplaySetting {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute(isDisplayed) {
        await this.settingRepo.updateIsCalculatorDisplayed(isDisplayed)
    }
}