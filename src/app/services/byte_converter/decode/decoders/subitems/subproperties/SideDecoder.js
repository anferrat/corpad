import { Decoder } from "../../Decoder";
import { DecoderResult } from "../../DecoderResult";

export class SideDecoder extends Decoder {
    constructor() {
        super()
    }

    decode(buf, initialOffset) {
        const numberOfSides = this._decodeUint8(buf, initialOffset)
        let offset = numberOfSides.offset
        const sides = []
        for (let i = 0; i < numberOfSides.value; i++) {
            const sideIndex = this._decodeUint8(buf, offset)
            sides.push(sideIndex.value)
            offset = sideIndex.offset
        }
        return new DecoderResult(sides, offset)
    }
}