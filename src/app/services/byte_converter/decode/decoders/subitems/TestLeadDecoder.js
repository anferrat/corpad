import { Decoder } from "../Decoder";
import { DecoderResult } from "../DecoderResult";

export class TestLeadDecoder extends Decoder {
    constructor(potentialDecoder, wireParamDecoder) {
        super()
        this.potentialDecoder = potentialDecoder
        this.wireParamDecoder = wireParamDecoder
    }

    decode(buf, offset) {
        const wireParams = this.wireParamDecoder.decode(buf, offset)
        const potentials = this.potentialDecoder.decode(buf, wireParams.offset)
        return new DecoderResult({
            ...wireParams.value,
            potentials: potentials.value
        }, potentials.offset)
    }
}