import { Decoder } from "../Decoder";
import { DecoderResult } from "../DecoderResult";

export class CircuitDecoder extends Decoder {
    constructor() {
        super()
    }

    _valueCheck(value, denominator) {
        return value === null ? null : value / denominator
    }

    decode(buf, offset) {
        const name = this._decodeString(buf, offset)
        const ratioVoltage = this._decodeUint16(buf, name.offset)
        const ratioCurrent = this._decodeUint16(buf, ratioVoltage.offset)
        const targetMin = this._decodeUint16(buf, ratioCurrent.offset)
        const targetMax = this._decodeUint16(buf, targetMin.offset)
        const current = this._decodeUint32(buf, targetMax.offset)
        const voltage = this._decodeUint32(buf, current.offset)
        return new DecoderResult({
            name: name.value,
            ratioVoltage: ratioVoltage.value,
            ratioCurrent: ratioCurrent.value,
            targetMin: this._valueCheck(targetMin.value, 100),
            targetMax: this._valueCheck(targetMax.value, 100),
            current: this._valueCheck(current.value, 1000),
            voltage: this._valueCheck(voltage.value, 1000)
        }, voltage.offset)
    }
}