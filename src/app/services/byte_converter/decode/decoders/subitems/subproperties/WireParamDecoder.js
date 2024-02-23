import { Decoder } from "../../Decoder";
import { DecoderResult } from "../../DecoderResult";

export class WireParamDecoder extends Decoder {
    constructor(codes) {
        super()
        this.codes = codes
    }

    decode(buf, offset) {
        const wireColor = this._decodeUint8(buf, offset)
        const wireGauge = this._decodeUint8(buf, wireColor.offset)
        return new DecoderResult({
            wireColor: this.codes.wireColors[wireColor.value] ?? null,
            wireGauge: this.codes.wireGauges[wireGauge.value] ?? null
        }, wireGauge.offset)
    }
}