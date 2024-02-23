import { Encoder } from "../Encoder"

export class IsolationEncoder extends Encoder {
    constructor(codes, sideEncoder) {
        super()
        this.codes = codes
        this.sideEncoder = sideEncoder
    }

    _encodeShortingCurrent(shorted, current, fromAtoB) {
        return shorted ?
            this._encodeInt32(current === null ? null : Math.round(Number(fromAtoB) * current * 1000)) :
            this._getEmptyBuffer()
    }

    encode(subitem, subitems) {
        const { isolationType, sideA, sideB, shorted, current, fromAtoB } = subitem
        return this._concat([
            this.sideEncoder.encode(sideA, subitems),
            this.sideEncoder.encode(sideB, subitems),
            this._encodeUint8(this.codes.isolationTypes[isolationType]),
            this._encodeUint8(Number(shorted)),
            this._encodeShortingCurrent(shorted, current, fromAtoB),
        ])
    }
}