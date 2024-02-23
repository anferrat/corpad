import { Encoder } from "../Encoder"

export class CircuitEncoder extends Encoder {
    constructor() {
        super()
    }

    _ratioCheck(value) {
        return value === null ? null : Math.round(Math.abs(value))
    }

    _targetCheck(value) {
        return value === null ? null : Math.round(Math.abs(value) * 100)
    }

    _valueCheck(value) {
        return value === null ? null : Math.round(Math.abs(value) * 1000)
    }


    encode(subitem) {
        const { ratioVoltage, ratioCurrent, targetMin, targetMax, current, voltage, name } = subitem
        return this._concat([
            this._encodeString(name),
            this._encodeUint16(this._ratioCheck(ratioVoltage)),
            this._encodeUint16(this._ratioCheck(ratioCurrent)),
            this._encodeUint16(this._targetCheck(targetMin)),
            this._encodeUint16(this._targetCheck(targetMax)),
            this._encodeUInt32(this._valueCheck(current)),
            this._encodeUInt32(this._valueCheck(voltage)),
        ])
    }
}