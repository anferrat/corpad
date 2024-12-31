import { PermanentPotentialTypes } from "../../../../../../constants/global"
import { Error, errors } from "../../../../../utils/Error"

export class GetOnOffPotentialPair {
    constructor(potentialRepo, potentialTypeRepo) {
        this.potentialRepo = potentialRepo
        this.potentialTypeRepo = potentialTypeRepo
    }

    _getSecondPotentialType(firstType, potentialTypes) {
        return potentialTypes.find(({ type }) => firstType.type === PermanentPotentialTypes.OFF ? type === PermanentPotentialTypes.ON : type === PermanentPotentialTypes.OFF)
    }

    _getSecondPotential(firstPotential, secondPotentialType, potentials) {
        return potentials.find(({ potentialType, referenceCellId, isPortableReference }) =>
            potentialType === secondPotentialType.id &&
            referenceCellId === firstPotential.referenceCellId &&
            isPortableReference === firstPotential.isPortableReference)
    }

    _getCycle(potentialPermType) {
        return potentialPermType === PermanentPotentialTypes.ON ? 'on' : 'off'
    }

    async execute({ subitemId, potentialId }) {
        const [potentials, potentialTypes] = await Promise.all([
            this.potentialRepo.getBySubitemId(subitemId),
            this.potentialTypeRepo.getAll(),
        ])
        const firstPotential = potentials.find(({ id }) => id === potentialId)
        if (firstPotential) {
            const firstPotentialType = potentialTypes.find(({ id }) => id === firstPotential.potentialType)
            if (firstPotentialType && firstPotentialType.type === PermanentPotentialTypes.ON || firstPotentialType.type === PermanentPotentialTypes.OFF) {
                const secondPotentialType = this._getSecondPotentialType(firstPotentialType, potentialTypes)
                if (secondPotentialType) {
                    const secondPotential = this._getSecondPotential(firstPotential, secondPotentialType, potentials)
                    if (secondPotential)
                        return ({
                            [this._getCycle(firstPotentialType.type)]: firstPotential.id,
                            [this._getCycle(secondPotentialType.type)]: secondPotential.id
                        })
                }
            }
        }
        throw new Error(errors.GENERAL, 'Unable to get potential pair', 'Paired potential is not found')
    }
}