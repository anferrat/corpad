import { Encoder } from "../Encoder";

export class CouponEncoder extends Encoder {
    constructor(codes, potentialEncoder, wireParamEncoder) {
        super()
        this.codes = codes
        this.potentialEncoder = potentialEncoder
        this.wireParamEncoder = wireParamEncoder
    }

    _getSubitemIndex(id, subitems) {
        const index = subitems.findIndex((subitem) => subitem.id === id)
        return ~index ? index : null
    }

    encode(subitem, subitems, referenceCells, potentialTypes) {
        const { pipelineCardId, wireColor, wireGauge, potentials, current, area, couponType } = subitem
        return this._concat([
            this._encodeUint8(this.codes.couponTypes[couponType]),
            this._encodeUint8(this._getSubitemIndex(pipelineCardId, subitems)),
            this._encodeUint16(Math.round(Math.abs(area))),
            this._encodeInt32(Math.round(current)),
            this.wireParamEncoder.encode(wireColor, wireGauge),
            this.potentialEncoder.encode(potentials, referenceCells, potentialTypes)
        ]
        )
    }
}