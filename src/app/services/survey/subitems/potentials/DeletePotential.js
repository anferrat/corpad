export class DeletePotential {
    constructor (potentialRepo) {
        this.potentialRepo = potentialRepo
    }

    async execute(id) {
        return this.potentialRepo.delete(id)
    }
}