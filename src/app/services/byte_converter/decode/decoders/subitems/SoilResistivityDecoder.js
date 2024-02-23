import { Decoder } from "../Decoder";
import { DecoderResult } from "../DecoderResult";

export class SoilResistivityDecoder extends Decoder {
    constructor(codes, soilResistivityLayerDecoder) {
        super()
        this.codes = codes
        this.soilResistivityLayerDecoder = soilResistivityLayerDecoder
    }

    decode(buf, initialOffset) {
        const comment = this._decodeString(buf, initialOffset)
        const numberOfLayers = this._decodeUint8(buf, comment.offset)
        const layers = []
        let offset = numberOfLayers.offset
        for (let i = 0; i < numberOfLayers.value; i++) {
            const layer = this.soilResistivityLayerDecoder.decode(buf, offset)
            layers.push(layer.value)
            offset = layer.offset
        }
        return new DecoderResult({
            comment: comment.value,
            layers
        }, offset)
    }
}