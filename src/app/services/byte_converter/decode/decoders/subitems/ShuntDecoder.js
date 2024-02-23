import { Decoder } from "../Decoder"
import { DecoderResult } from "../DecoderResult"

export class ShuntDecoder extends Decoder {
    constructor(sideDecoder) {
        super()
        this.sideDecoder = sideDecoder
    }

    decode(buf, offset) {
        const sideA = this.sideDecoder.decode(buf, offset)
        const sideB = this.sideDecoder.decode(buf, sideA.offset)
        const factor = this._decodeUint32(buf, sideB.offset)
        const voltageDrop = this._decodeInt32(buf, factor.offset)
        return new DecoderResult({
            sideA: sideA.value,
            sideB: sideB.value,
            factor: factor.value === null ? null : factor.value / 100000,
            fromAtoB: voltageDrop.value > 0 || voltageDrop.value === null,
            voltageDrop: voltageDrop.value === null ? null : Math.abs(voltageDrop.value / 10)
        }, voltageDrop.offset)
    }
}