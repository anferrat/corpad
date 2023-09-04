import { Potential } from "../../../../entities/survey/subitems/Potential"
import { Error, errors } from "../../../../utils/Error"
import { guid } from "../../../../utils/guid"

export class CreatePotential {
    constructor(potentialRepo, potentialPresenter) {
        this.potentialRepo = potentialRepo
        this.potentialPresenter = potentialPresenter
    }

    async execute(referenceCellIndex, potentialTypeIndex, subitemId, potentialTypes, referenceCells) {
        const refCell = referenceCells[referenceCellIndex]
        const potentialType = potentialTypes[potentialTypeIndex]
        if (refCell && potentialType) {
            const potential = new Potential(null, guid(), subitemId, null, potentialType.id, refCell.id, refCell.isPortable, null)
            return this.potentialPresenter.execute(potential, potentialType, refCell)
        }
        else throw new Error(errors.GENERAL, `Unable to create potential based on provided data.`)
    }
}