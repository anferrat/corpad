import { Encoder } from "../Encoder"

export class TestLeadEncoder extends Encoder {
    constructor(potentialEncoder, wireParamEncoder) {
        super()
        this.potentialEncoder = potentialEncoder
        this.wireParamEncoder = wireParamEncoder
    }

    encode(subitem, referenceCells, potentialTypes) {
        const { wireColor, wireGauge, potentials } = subitem
        return this._concat([
            this.wireParamEncoder.encode(wireColor, wireGauge),
            this.potentialEncoder.encode(potentials, referenceCells, potentialTypes)
        ])
    }
}