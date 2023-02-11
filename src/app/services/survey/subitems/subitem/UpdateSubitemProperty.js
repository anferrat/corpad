export class UpdateSubitemProperty {
    constructor (subitemRepo) {
        this.subitemRepo = subitemRepo
    }

    async execute(id, parentId, propertyType, subitemType, value) {
        const currentTime = Date.now()
        await this.subitemRepo.updateProperty(id, parentId, propertyType, subitemType, value, currentTime)
        return { timeModified: currentTime }
    }
}