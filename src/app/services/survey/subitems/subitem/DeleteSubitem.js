export class DeleteSubitem {
    constructor(subitemRepo) {
        this.subitemRepo = subitemRepo
    }

    async execute(itemId, subitemId, subitemType) {
        const currentTime = Date.now()
        await this.subitemRepo.delete(itemId, subitemId, subitemType, currentTime)
        return { itemId, subitemId, subitemType, timeModified: currentTime }
    }
}