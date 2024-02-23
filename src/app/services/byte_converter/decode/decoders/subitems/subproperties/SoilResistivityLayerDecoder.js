import { Decoder } from "../../Decoder";
import { DecoderResult } from "../../DecoderResult";

export class SoilResistivityLayerDecoder extends Decoder {
    constructor() {
        super()
    }

    decode(buf, offset) {
        const resistanceToZero = this._decodeUint32(buf, offset)
        const spacing = this._decodeUint32(buf, resistanceToZero.offset)
        return new DecoderResult({
            resistanceToZero: resistanceToZero.value === null ? null : resistanceToZero.value / 1000,
            spacing: spacing.value === null ? null : spacing.value / 1000
        }, spacing.offset)
    }
}