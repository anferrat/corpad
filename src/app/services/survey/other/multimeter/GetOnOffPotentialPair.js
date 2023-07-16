import { MultimeterCycles, PermanentPotentialTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"

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
        return potentialPermType === PermanentPotentialTypes.ON ? MultimeterCycles.ON : MultimeterCycles.OFF
    }

    async execute({ subitemId, potentialId }) {
        const [potentials, potentialTypes] = await Promise.all([
            this.potentialRepo.getBySubitemId(subitemId),
            this.potentialTypeRepo.getAll()
        ])
        if (potentials.length === 0)
            throw new Error(errors.GENERAL, `Potential was not found with subitemId ${subitemId}`, 'Unable to return pair',)
        else {
            const firstPotential = potentials.find(({ id }) => id === potentialId)
            if (!firstPotential)
                throw new Error(errors.GENERAL, `Potential id ${potentialId} is not found in subitem with id ${subitemId}`, 'Unable to return pair',)
            else {
                const firstPotentialType = potentialTypes.find(({ id }) => id === firstPotential.potentialType)
                if (!firstPotentialType)
                    throw new Error(errors.GENERAL, `Potential type is not found`, 'Unable to return pair',)
                else {
                    if (firstPotentialType.type === PermanentPotentialTypes.ON || firstPotentialType.type === PermanentPotentialTypes.OFF) {
                        const secondPotentialType = this._getSecondPotentialType(firstPotentialType, potentialTypes)
                        if (secondPotentialType) {
                            const secondPotential = this._getSecondPotential(firstPotential, secondPotentialType, potentials)
                            if (secondPotential)
                                return [{ cycle: this._getCycle(firstPotentialType.type), potentialId: firstPotential.id, name: firstPotentialType.name }, { cycle: this._getCycle(secondPotentialType.type), potentialId: secondPotential.id, name: secondPotentialType.name }]
                        }
                    }
                    return [{ cycle: null, potentialId, name: firstPotentialType.name }]
                }
            }
        }

    }
}