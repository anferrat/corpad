import { Encoder } from "../Encoder";

export class ReferenceCellEncoder extends Encoder {
    constructor(codes, potentialEncoder, wireParamEncoder) {
        super()
        this.codes = codes
        this.potentialEncoder = potentialEncoder
        this.wireParamEncoder = wireParamEncoder
    }

    encode(subitem, referenceCells, potentialTypes) {
        const { rcType, wireColor, wireGauge } = subitem
        return this._concat([
            this._encodeUint8(this.codes.referenceCellTypes[rcType]),
            this.wireParamEncoder.encode(wireColor, wireGauge),
            this.potentialEncoder.encode(potentials, referenceCells, potentialTypes)
        ])
    }
}