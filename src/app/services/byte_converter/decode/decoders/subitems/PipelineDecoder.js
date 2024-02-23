import { Decoder } from "../Decoder"
import { DecoderResult } from "../DecoderResult"

export class PipelineDecoder extends Decoder {
    constructor(wireParamDecoder, potentialDecoder) {
        super()
        this.wireParamDecoder = wireParamDecoder
        this.potentialDecoder = potentialDecoder
    }

    _decodeName(buf, offset, isPipeAssigned) {
        if (isPipeAssigned)
            return new DecoderResult(null, offset)
        else
            return this._decodeString(buf, offset)
    }

    decode(buf, offset) {
        const pipelineId = this._decodeUint8(buf, offset)
        const name = this._decodeName(buf, pipelineId.offset, pipelineId.value !== null)
        const wireParams = this.wireParamDecoder.decode(buf, name.offset)
        const potentials = this.potentialDecoder.decode(buf, wireParams.offset)
        return new DecoderResult({
            pipelineId: pipelineId.value,
            name: name.value,
            ...wireParams.value,
            potentials: potentials.value
        }, potentials.offset)
    }
}