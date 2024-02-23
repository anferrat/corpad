import { Decoder } from "../Decoder";
import { DecoderResult } from "../DecoderResult";

export class RiserDecoder extends Decoder {
    constructor(codes, potentialDecoder) {
        super()
        this.codes = codes
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
        const nps = this._decodeUint8(buf, name.offset)
        const potentials = this.potentialDecoder.decode(buf, nps.offset)
        return new DecoderResult({
            pipelineId: pipelineId.value,
            name: name.value,
            nps: this.codes.pipeSizes[nps.value] ?? null,
            potentials: potentials.value
        }, potentials.offset)
    }
}