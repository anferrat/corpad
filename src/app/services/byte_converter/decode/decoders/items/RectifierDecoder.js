import { TapOptions } from "../../../../../../constants/global"
import { Decoder } from "../Decoder"
import { DecoderResult } from "../DecoderResult"
import { Error, errors } from "../../../../../utils/Error"

export class RectifierDecoder extends Decoder {
    constructor(codes) {
        super()
        this.codes = codes
    }

    _decodeCurVol(buf, initialOffset) {
        const { value, offset } = this._decodeUint16(buf, initialOffset)
        const result = value === null ? null : (value / 10)
        return new DecoderResult(result, offset)
    }

    _decodeTapValue(buf, offset, tapSetting) {
        switch (tapSetting) {
            case null:
            case TapOptions.AUTO:
                return new DecoderResult({}, offset)
            case TapOptions.COARSE_FINE:
                const tapCoarse = this._decodeUint8(buf, offset)
                const tapFine = this._decodeUint8(buf, tapCoarse.offset)
                return new DecoderResult({
                    tapCoarse: this.codes.coarseFineOptions[tapCoarse.value] ?? null,
                    tapFine: this.codes.coarseFineOptions[tapFine.value] ?? null
                }, tapFine.offset)
            case TapOptions.RESISTOR:
                const tapValue = this._decodeUint16(buf, offset)
                return new DecoderResult({
                    tapValue: tapValue.value === null ? null : tapValue.value / 100,
                }, tapValue.offset)
            default:
                throw new Error(errors.GENERAL, 'Unable to decode tapValue', 'Unsupported tapSetting')
        }
    }


    decode(buf, offset) {
        const maxVoltage = this._decodeCurVol(buf, offset)
        const maxCurrent = this._decodeCurVol(buf, maxVoltage.offset)
        const serialNumber = this._decodeString(buf, maxCurrent.offset)
        const model = this._decodeString(buf, serialNumber.offset)
        const powerSource = this._decodeUint8(buf, model.offset)
        const tapSetting = this._decodeUint8(buf, powerSource.offset)
        const tapSettingValue = this.codes.tapSettings[tapSetting.value] ?? null
        const tapData = this._decodeTapValue(buf, tapSetting.offset, tapSettingValue)
        const acVoltage = this._decodeCurVol(buf, tapData.offset)
        const acCurrent = this._decodeCurVol(buf, acVoltage.offset)

        return new DecoderResult({
            maxVoltage: maxVoltage.value,
            maxCurrent: maxCurrent.value,
            serialNumber: serialNumber.value,
            model: model.value,
            powerSource: this.codes.powerSources[powerSource.value] ?? null,
            tapSetting: tapSettingValue,
            ...tapData.value,
            acVoltage: acVoltage.value,
            acCurrent: acCurrent.value
        }, acCurrent.offset)
    }
}