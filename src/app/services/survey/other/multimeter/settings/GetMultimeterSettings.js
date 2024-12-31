import { Error, errors } from "../../../../../utils/Error"

export class GetMultimeterSettings {
    constructor(settingRepo) {
        this.settingRepo = settingRepo
    }

    async execute() {
        const { multimeter } = await this.settingRepo.get()
        if (multimeter)
            return multimeter
        else throw new Error(errors.GENERAL, 'Multimeter settings are not initialized')
    }
}