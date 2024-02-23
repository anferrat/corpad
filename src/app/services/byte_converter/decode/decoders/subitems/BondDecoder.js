import { Decoder } from "../Decoder";
import { DecoderResult } from "../DecoderResult";

export class BondDecoder extends Decoder {
    constructor(sideDecoder) {
        super()
        this.sideDecoder = sideDecoder
    }

    decode(buf, offset) {
        const sideA = this.sideDecoder.decode(buf, offset)
        const sideB = this.sideDecoder.decode(buf, sideA.offset)
        const current = this._decodeInt32(buf, sideB.offset)
        const fromAtoB = current.value > 0 || current.value === null
        const multiplier = fromAtoB ? 1 : -1
        return new DecoderResult({
            sideA: sideA.value,
            sideB: sideB.value,
            current: current.value === null ? null : current.value / 1000 * multiplier,
            fromAtoB
        }, current.offset)
    }
}