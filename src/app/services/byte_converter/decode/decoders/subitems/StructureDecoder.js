import { Decoder } from "../Decoder";
import { DecoderResult } from "../DecoderResult";

export class StructureDecoder extends Decoder {
    constructor(potentialDecoder) {
        super()
        this.potentialDecoder = potentialDecoder
    }

    decode(buf, offset) {
        const description = this._decodeString(buf, offset)
        const potentials = this.potentialDecoder.decode(buf, description.offset)
        return new DecoderResult({
            description: description.value,
            potentials: potentials.value
        }, potentials.offset)
    }
}