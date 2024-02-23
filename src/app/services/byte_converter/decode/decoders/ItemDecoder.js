import { ItemTypes } from "../../../../../constants/global";
import { Error, errors } from "../../../../utils/Error";
import { Decoder } from "./Decoder";
import { DecoderResult } from "./DecoderResult";

export class ItemDecoder extends Decoder {
    constructor(testPointDecoder, rectifierDecoder, codes) {
        super()
        this.codes = codes
        this.testPointDecoder = testPointDecoder
        this.rectifierDecoder = rectifierDecoder
    }

    _decodeName(buf, initialOffset) {
        const { value, offset } = this._decodeString(buf, initialOffset)
        if (!value)
            throw new Error(errors.VALIDATION, `Decoded name ${value} is not valid name`, 'Error with item name decoding')
        return new DecoderResult(value, offset)
    }

    _decodeType(buf, initialOffset) {
        const { value, offset } = this._decodeUint8(buf, initialOffset)
        if (this.codes.itemTypes[value])
            return new DecoderResult(this.codes.itemTypes[value], offset)
        else throw new Error(errors.VALIDATION, `Unable to decode item type ${value}`, 'Error decoding item type')
    }

    _decodeCoordinate(buf, initialOffset) {
        const { value, offset } = this._decodeInt32(buf, initialOffset)
        return new DecoderResult(value === null ? null : value / 10000000, offset)
    }

    _decodeData(buf, initialOffset, itemType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return this.testPointDecoder.decode(buf, initialOffset)
            case ItemTypes.RECTIFIER:
                return this.rectifierDecoder.decode(buf, initialOffset)
            default:
                throw new Error(errors.VALIDATION, 'Unsupported item type', 'Item type decoding is not supported')
        }
    }


    decode(buf, offset) {
        const itemType = this._decodeType(buf, offset)
        const name = this._decodeName(buf, itemType.offset)
        const uid = this._decodeString(buf, name.offset)
        const latitude = this._decodeCoordinate(buf, uid.offset)
        const longitude = this._decodeCoordinate(buf, latitude.offset)
        const location = this._decodeString(buf, longitude.offset)
        const comment = this._decodeString(buf, location.offset)
        const data = this._decodeData(buf, comment.offset, itemType.value)
        return new DecoderResult({
            itemType: itemType.value,
            name: name.value,
            uid: uid.value,
            latitude: latitude.value,
            longitude: longitude.value,
            location: location.value,
            comment: comment.value,
            ...data.value
        }, data.offset)
    }
}