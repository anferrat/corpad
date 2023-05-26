import { DefaultNames } from "../../../../../constants/labels"

export class DefaultNameInitialization {
    constructor(defaultNameRepo) {
        this.defaultNameRepo = defaultNameRepo
    }

    async execute() {
        const names = await this.defaultNameRepo.getAll()
        const valid = names.length === Object.keys(DefaultNames).length &&
            names.every(({ type }) => ~Object.keys(DefaultNames).indexOf(type))
        if (!valid)
            await this.defaultNameRepo.updateAll(DefaultNames)
    }
}