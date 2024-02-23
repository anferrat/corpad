import { TapOptions } from "../../../../../../constants/global"
import { Error, errors } from "../../../../../utils/Error"
import { Encoder } from "../Encoder"

export class RectifierEncoder extends Encoder {
    constructor(codes) {
        super()
        this.codes = codes
    }

    _encodeCurVol(value) {
        return this._encodeUint16(value === null ? null : Math.round(value * 10))
    }


    _encodeTapValue(tapSetting, tapValue, tapCoarse, tapFine) {
        switch (tapSetting) {
            case TapOptions.AUTO:
            case null:
                return this._getEmptyBuffer()
            case TapOptions.COARSE_FINE:
                return this._concat([
                    this._encodeUint8(this.codes.coarseFineOptions[tapCoarse]),
                    this._encodeUint8(this.codes.coarseFineOptions[tapFine])
                ])
            case TapOptions.RESISTOR:
                return this._encodeUint16(tapValue === null ? null : Math.round(tapValue * 100))
            default:
                throw new Error(errors.GENERAL, 'Unable to encode tapValue', 'Unsupported tapSetting')
        }
    }

    encode(rectifier) {
        const { maxVoltage, maxCurrent, serialNumber, model, powerSource, tapSetting, tapValue, tapCoarse, tapFine, acVoltage, acCurrent } = rectifier
        return this._concat([
            this._encodeCurVol(maxVoltage),
            this._encodeCurVol(maxCurrent),
            this._encodeString(serialNumber),
            this._encodeString(model),
            this._encodeUint8(powerSource === null ? null : this.codes.powerSources[powerSource]),
            this._encodeUint8(tapSetting === null ? null : this.codes.tapSettings[tapSetting]),
            this._encodeTapValue(tapSetting, tapValue, tapCoarse, tapFine),
            this._encodeCurVol(acVoltage),
            this._encodeCurVol(acCurrent)
        ])
    }
}