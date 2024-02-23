import { Encoder } from "../Encoder"

export class AnodeEncoder extends Encoder {
    constructor(codes, potentialEncoder, wireParamEncoder) {
        super()
        this.codes = codes
        this.potentialEncoder = potentialEncoder
        this.wireParamEncoder = wireParamEncoder
    }

    encode(subitem, referenceCells, potentialTypes) {
        const { anodeMaterial, wireColor, wireGauge, potentials } = subitem
        return this._concat([
            this._encodeUint8(this.codes.anodeMaterials[anodeMaterial]),
            this.wireParamEncoder.encode(wireColor, wireGauge),
            this.potentialEncoder.encode(potentials, referenceCells, potentialTypes)
        ])
    }
}