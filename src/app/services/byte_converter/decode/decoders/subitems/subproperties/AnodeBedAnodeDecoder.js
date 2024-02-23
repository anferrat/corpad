import { Decoder } from "../../Decoder"
import { DecoderResult } from "../../DecoderResult"

export class AnodeBedAnodeDecoder extends Decoder {
    constructor(wireParamDecoder) {
        super()
        this.wireParamDecoder = wireParamDecoder
    }

    decode(buf, offset) {
        const wireParams = this.wireParamDecoder.decode(buf, offset)
        const current = this._decodeUint32(buf, wireParams.offset)
        return new DecoderResult({
            ...wireParams.value,
            current: current.value !== null ? current.value / 1000 : null
        }, current.offset)
    }
}