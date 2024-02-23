import { Encoder } from "../../Encoder";

export class WireParamEncoder extends Encoder {
    constructor(codes) {
        super()
        this.codes = codes
    }
    encode(wireColor, wireGauge) {
        return this._concat([
            this._encodeUint8(this.codes.wireColors[wireColor]),
            this._encodeUint8(this.codes.wireGauges[wireGauge]),
        ])
    }
}