import { defaultNames } from "../../../../entities/survey/other/DefaultNames"

export class DefaultNameInitialization {
    constructor(defaultNameRepo) {
        this.defaultNameRepo = defaultNameRepo
    }

    async execute() {
        const names = await this.defaultNameRepo.getAll()
        const valid = names.length === Object.keys(defaultNames).length &&
            names.every(({ type }) => ~Object.keys(defaultNames).indexOf(type))
        if (!valid)
            await this.defaultNameRepo.updateAll(defaultNames)
    }
}