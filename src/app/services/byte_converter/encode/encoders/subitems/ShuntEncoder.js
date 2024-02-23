import { Encoder } from "../Encoder"

export class ShuntEncoder extends Encoder {
    constructor(sideEncoder) {
        super()
        this.sideEncoder = sideEncoder
    }

    encode(subitem, subitems) {
        const { sideA, sideB, factor, voltageDrop, fromAtoB } = subitem
        const multiplier = fromAtoB ? 1 : -1
        return this._concat([
            this.sideEncoder.encode(sideA, subitems),
            this.sideEncoder.encode(sideB, subitems),
            this._encodeUInt32(Math.round(Math.abs(factor) * 100000)),
            this._encodeInt32(Math.round(voltageDrop * 10 * multiplier))
        ])
    }
}