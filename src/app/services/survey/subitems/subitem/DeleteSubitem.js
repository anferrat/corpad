export class DeleteSubitem {
    constructor (subitemRepo) {
        this.subitemRepo = subitemRepo
    }

    async execute(id, subitemType) {
        await this.subitemRepo.delete(id, subitemType)
    }
}