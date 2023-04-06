export class DeletePotentialType {
    constructor(potentialTypeRepo) {
        this.potentialTypeRepo = potentialTypeRepo
    }

    async execute(id) {
        return await this.potentialTypeRepo.delete(id)
    }
}