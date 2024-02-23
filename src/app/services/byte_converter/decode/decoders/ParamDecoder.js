import { Decoder } from "./Decoder";
import { DecoderResult } from "./DecoderResult";

export class ParamDecoder extends Decoder {
    constructor() {
        super()
    }

    _decodeId(buf) {
        return this._decodeUint32(buf, 0)
    }

    _decodeTimestamp(buf, initialOffset) {
        const { value, offset } = this._decodeUint32(buf, initialOffset)
        return new DecoderResult(value * 1000, offset)
    }


    decode(buf) {
        const id = this._decodeId(buf)
        const timestamp = this._decodeTimestamp(buf, id.offset)
        return new DecoderResult({
            id: id.value,
            timestamp: timestamp.value,
        }, timestamp.offset)
    }
}