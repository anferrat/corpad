import { PotentialType } from "../../../../entities/survey/other/PotentialType"
import { guid } from "../../../../utils/guid"

export class CreatePotentialType {
    constructor(potentialTypeRepo, basicPresenter) {
        this.potentialTypeRepo = potentialTypeRepo
        this.basicPresenter = basicPresenter
    }

    async execute(name) {
        const potentialType = new PotentialType(null, guid(), name, null, false)
        return this.basicPresenter.execute(await this.potentialTypeRepo.create(potentialType))
    }
}