import { Decoder } from "../Decoder"
import { DecoderResult } from "../DecoderResult"

export class AnodeDecoder extends Decoder {
    constructor(codes, potentialDecoder, wireParamDecoder) {
        super()
        this.codes = codes
        this.potentialDecoder = potentialDecoder
        this.wireParamDecoder = wireParamDecoder
    }

    decode(buf, offset) {
        const anodeMaterial = this._decodeUint8(buf, offset)
        const wireParams = this.wireParamDecoder.decode(buf, anodeMaterial.offset)
        const potentials = this.potentialDecoder.decode(buf, wireParams.offset)
        return new DecoderResult({
            anodeMaterial: this.codes.anodeMaterials[anodeMaterial.value] ?? null,
            potentials: potentials.value,
            ...wireParams.value
        }, potentials.offset)
    }
}