import { Decoder } from "../Decoder"
import { DecoderResult } from "../DecoderResult"

export class AnodeBedDecoder extends Decoder {
    constructor(codes, anodeBedAnodeDecoder) {
        super()
        this.codes = codes
        this.anodeBedAnodeDecoder = anodeBedAnodeDecoder
    }

    decode(buf, initialOffset) {
        const materialType = this._decodeUint8(buf, initialOffset)
        const enclosureType = this._decodeUint8(buf, materialType.offset)
        const bedType = this._decodeUint8(buf, enclosureType.offset)
        const numberOfAnodes = this._decodeUint8(buf, bedType.offset)
        let anodes = []
        let offset = numberOfAnodes.offset
        for (let i = 0; i < numberOfAnodes.value; i++) {
            const anode = this.anodeBedAnodeDecoder.decode(buf, offset)
            anodes.push(anode.value)
            offset = anode.offset
        }
        return new DecoderResult({
            materialType: this.codes.anodeBedMaterialTypes[materialType.value] ?? null,
            enclosureType: this.codes.enclosureTypes[enclosureType.value] ?? null,
            bedType: this.codes.anodeBedTypes[bedType.value] ?? null,
            anodes,
        }, offset)
    }
}