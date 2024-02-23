import { Decoder } from "../Decoder";
import { DecoderResult } from "../DecoderResult";

export class CouponDecoder extends Decoder {
    constructor(codes, potentialDecoder, wireParamDecoder) {
        super()
        this.codes = codes
        this.potentialDecoder = potentialDecoder
        this.wireParamDecoder = wireParamDecoder
    }

    decode(buf, offset) {
        const couponType = this._decodeUint8(buf, offset)
        const pipelineCardId = this._decodeUint8(buf, couponType.offset)
        const area = this._decodeUint16(buf, pipelineCardId.offset)
        const current = this._decodeInt32(buf, area.offset)
        const wireParams = this.wireParamDecoder.decode(buf, current.offset)
        const potentials = this.potentialDecoder.decode(buf, wireParams.offset)
        return new DecoderResult({
            couponType: this.codes.couponTypes[couponType.value] ?? null,
            pipelineCardId: pipelineCardId.value,
            area: area.value,
            current: current.value,
            ...wireParams.value,
            potentials: potentials.value
        }, potentials.offset)
    }
}