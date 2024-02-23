import { Encoder } from "../Encoder";

export class SoilResistivityEncoder extends Encoder {
    constructor(soilResistivityLayerEncoder) {
        super()
        this.soilReistivityLayerEncoder = soilResistivityLayerEncoder
    }

    encode(subitem) {
        const { layers, comment } = subitem
        return this._concat([
            this._encodeString(comment),
            this._encodeUint8(layers.length),
            layers.length === 0 ?
                this._getEmptyBuffer() :
                this._concat(layers.map(layer => this.soilReistivityLayerEncoder.encode(layer)))
        ])
    }
}