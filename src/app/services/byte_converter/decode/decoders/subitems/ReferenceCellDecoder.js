import { Decoder } from "../Decoder";
import { DecoderResult } from "../DecoderResult";

export class ReferenceCellDecoder extends Decoder {
    constructor(codes, wireParamDecoder, potentialDecoder) {
        super()
        this.codes = codes
        this.wireParamDecoder = wireParamDecoder
        this.potentialDecoder = potentialDecoder
    }

    decode(buf, offset) {
        const rcType = this._decodeUint8(buf, offset)
        const wireParams = this.wireParamDecoder.decode(buf, rcType.offset)
        const potentials = this.potentialDecoder.decode(buf, wireParams.offset)
        return new DecoderResult({
            rcType: this.codes.referenceCellTypes[rcType.value] ?? null,
            ...wireParams.value,
            potentials: potentials.value
        }, potentials.offset)
    }
}