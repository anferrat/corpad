import { Encoder } from "../../Encoder"

export class SoilResistivityLayerEncoder extends Encoder {
    constructor() {
        super()
    }

    encode(layer) {
        const { spacing, resistanceToZero } = layer
        return this._concat([
            this._encodeUInt32(Math.round(Math.abs(resistanceToZero) * 1000)),
            this._encodeUInt32(Math.round(Math.abs(spacing) * 1000))
        ])
    }
}