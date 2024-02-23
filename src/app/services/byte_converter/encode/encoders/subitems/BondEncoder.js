import { Encoder } from "../Encoder"

export class BondEncoder extends Encoder {
    constructor(sideEncoder) {
        super()
        this.sideEncoder = sideEncoder
    }


    encode(subitem, subitems) {
        const { current, sideA, sideB, fromAtoB } = subitem
        const multiplier = fromAtoB ? 1 : -1
        return this._concat([
            this.sideEncoder.encode(sideA, subitems),
            this.sideEncoder.encode(sideB, subitems),
            this._encodeInt32(current === null ? null : Math.round(multiplier * current * 1000))
        ])
    }
}