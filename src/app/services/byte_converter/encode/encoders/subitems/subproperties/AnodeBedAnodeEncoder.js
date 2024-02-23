import { Encoder } from "../../Encoder";

export class AnodeBedAnodeEncoder extends Encoder {
    constructor(wireParamEncoder) {
        super()
        this.wireParamEncoder = wireParamEncoder
    }

    encode(anode) {
        const { current, wireColor, wireGauge } = anode
        return this._concat([
            this.wireParamEncoder.encode(wireColor, wireGauge),
            this._encodeUInt32(Math.round(Math.abs(current * 1000)))
        ])
    }
}