import { ItemTypes } from "../../../../../constants/global"
import { Error, errors } from "../../../../utils/Error"
import { Encoder } from "./Encoder"

export class ItemEncoder extends Encoder {
    constructor(testPointEncoder, rectifierEncoder, codes) {
        super()
        this.codes = codes
        this.testPointEncoder = testPointEncoder
        this.rectifierEncoder = rectifierEncoder
    }

    _encodeType(type) {
        if (ItemTypes.TEST_POINT !== type && ItemTypes.RECTIFIER !== type)
            throw new Error(errors.GENERAL, 'Item is not supported', 'This item type is not supported for encoding')
        return this._encodeUint8(this.codes.itemTypes[type])
    }

    _encodeCoordinate(value) {
        return this._encodeInt32(value === null ? null : Math.round(value * 10000000))
    }

    _encodeName(name) {
        if (name === null)
            throw new Error(errors.GENERAL, 'Unable to encode item with name as null')
        return this._encodeString(name)
    }

    _encodeData(item) {
        if (item.itemType === ItemTypes.TEST_POINT)
            return this.testPointEncoder.encode(item)
        else if (item.itemType === ItemTypes.RECTIFIER)
            return this.rectifierEncoder.encode(item)
        else throw new Error(errors.GENERAL, 'Unable to encode item data', 'Unsupported item type')
    }

    _encodeComment(comment) {
        return this._encodeString(comment)
    }

    encode(item) {
        return this._concat([
            this._encodeType(item.itemType),
            this._encodeName(item.name),
            this._encodeString(item.uid),
            this._encodeCoordinate(item.latitude),
            this._encodeCoordinate(item.longitude),
            this._encodeString(item.location),
            this._encodeComment(item.comment),
            this._encodeData(item)
        ])
    }
}