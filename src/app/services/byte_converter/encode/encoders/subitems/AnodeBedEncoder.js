import { Encoder } from "../Encoder";

export class AnodeBedEncoder extends Encoder {
    constructor(codes, anodeBedAnodeEncoder) {
        super()
        this.codes = codes
        this.anodeBedAnodeEncoder = anodeBedAnodeEncoder
    }

    encode(subitem) {
        const { materialType, enclosureType, bedType, anodes } = subitem
        return this._concat([
            this._encodeUint8(this.codes.anodeBedMaterialTypes[materialType]),
            this._encodeUint8(this.codes.enclosureTypes[enclosureType]),
            this._encodeUint8(this.codes.anodeBedTypes[bedType]),
            this._encodeUint8(anodes.length),
            anodes.length === 0 ?
                this._getEmptyBuffer() :
                this._concat(anodes.map(anode => this.anodeBedAnodeEncoder.encode(anode)))
        ])
    }
}