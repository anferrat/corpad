import { Encoder } from "../../Encoder";

export class PotentialEncoder extends Encoder {
    constructor(codes) {
        super()
        this.codes = codes
    }

    _encodePotential(potential, potentialTypes, referenceCells) {
        const referenceType = referenceCells
            .get(Number(potential.isPortableReference))
            .get(potential.referenceCellId)
        const potentialType = potentialTypes.get(potential.potentialType)
        return this._concat([
            this._encodeUint8(Number(potential.isPortableReference)),
            this._encodeUint8(potential.isPortableReference ? this.codes.referenceCellTypes[referenceType] : referenceType),
            this._encodeUint8(this.codes.potentialTypes[potentialType]),
            this._encodeInt32(potential.value !== null ? Math.round(potential.value * 1000) : null)
        ])
    }

    encode(potentials, referenceCells, potentialTypes) {
        const encodedPotentials = potentials.filter(({ potentialType, isPortableReference, referenceCellId }) => {
            return referenceCells
                .get(Number(isPortableReference))
                .get(referenceCellId) !== undefined && potentialTypes.get(potentialType) !== undefined
        })
        const numberOfPotentials = encodedPotentials.length
        return this._concat([
            this._encodeUint8(numberOfPotentials),
            ...encodedPotentials.map(potential => this._encodePotential(potential, potentialTypes, referenceCells))
        ])
    }
}