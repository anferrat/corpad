export class PotentialTypeInitialization {
    /*
        This service makes sure that default potential types are created on app launch.
        Before v 1.7 AC potential type didnt exist. 

    */
    constructor(potentialTypeRepo, getDefaultPotentialTypes) {
        this.potentialTypeRepo = potentialTypeRepo
        this.getDefaultPotentialTypes = getDefaultPotentialTypes
    }

    async execute() {
        const types = await this.potentialTypeRepo.getAll()
        await Promise.all(this.getDefaultPotentialTypes.getMissingDefaultTypes(types).map(potType => this.potentialTypeRepo.create(potType)))
    }
}