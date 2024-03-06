import { Decoder } from "../Decoder";
import { DecoderResult } from "../DecoderResult";

export class IsolationDecoder extends Decoder {
    constructor(codes, sideDecoder) {
        super()
        this.codes = codes
        this.sideDecoder = sideDecoder
    }

    _decodeShortingCurrent(buf, offset, isShorted) {
        if (isShorted) {
            const current = this._decodeInt32(buf, offset)
            const fromAtoB = current.value > 0
            return new DecoderResult({
                current: current.value === null ? null : Math.abs(current.value) / 1000,
                fromAtoB,
            }, current.offset)
        }
        else
            return new DecoderResult({
                fromAtoB: null,
                current: null
            }, offset)
    }

    decode(buf, offset) {
        const sideA = this.sideDecoder.decode(buf, offset)
        const sideB = this.sideDecoder.decode(buf, sideA.offset)
        const isolationType = this._decodeUint8(buf, sideB.offset)
        const shorted = this._decodeUint8(buf, isolationType.offset)
        const shortingCurrent = this._decodeShortingCurrent(buf, shorted.offset, Boolean(shorted.value))
        return new DecoderResult({
            sideA: sideA.value,
            sideB: sideB.value,
            isolationType: this.codes.isolationTypes[isolationType.value] ?? null,
            shorted: Boolean(shorted.value),
            ...shortingCurrent.value
        }, shortingCurrent.offset)
    }
}