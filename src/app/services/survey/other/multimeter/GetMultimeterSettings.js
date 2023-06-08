export class GetMultimeterSettings {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute() {
        const { multimeter } = await this.settingRepo.get()
        return multimeter
    }
}