import { Buffer } from "buffer"
import { Error, errors } from "../../../../utils/Error"

export class Encoder {
    constructor() {
        this.UINT16MAX = 65535
        this.UINT16MIN = 0
        this.UINT8MAX = 255
        this.UINT8MIN = 0
        this.INT32MAX = 2147483647
        this.INT32MIN = -2147483648
        this.UINT32MAX = 4294967295
        this.UINT32MIN = 0
    }

    _verifyValue(value, min, max) {
        if (value === null || value === undefined)
            return max
        else if (value < min || value >= max)
            return max
        else return value
    }

    _encodeString(string) {
        if (!string)
            return this._encodeUint8(0)
        const value = Buffer.from(string)
        if (value.length > 254) {
            //FF represents null value
            const trimmed = Buffer.from(value, 0, 254)
            return Buffer.concat([this._encodeUint8(254), trimmed])
        }
        const length = this._encodeUint8(value.length)
        return Buffer.concat([length, value])
    }

    _encodeUint8(value) {
        const verifiedValue = this._verifyValue(value, this.UINT8MIN, this.UINT8MAX)
        const buffer = Buffer.allocUnsafe(1)
        buffer.writeUint8(verifiedValue)
        return buffer
    }

    _encodeInt32(value) {
        const verifiedValue = this._verifyValue(value, this.INT32MIN, this.INT32MAX)
        const buffer = Buffer.allocUnsafe(4)
        buffer.writeInt32LE(verifiedValue)
        return buffer
    }

    _encodeUint16(value) {
        const verifiedValue = this._verifyValue(value, this.UINT16MIN, this.UINT16MAX)
        const buffer = Buffer.allocUnsafe(2)
        buffer.writeUInt16LE(verifiedValue)
        return buffer
    }

    _encodeUInt32(value) {
        const verifiedValue = this._verifyValue(value, this.UINT32MIN, this.UINT32MAX)
        const buffer = Buffer.allocUnsafe(4)
        buffer.writeUint32LE(verifiedValue)
        return buffer
    }

    _writeBufSize(buffer) {
        const length = buffer.length
        if (length > this.UINT16MAX)
            throw new Error(errors.GENERAL, 'Unable to create buffer', "Buffer limit is reached")
        buffer.writeUint16LE(length)
    }

    _getEmptyBuffer() {
        return Buffer.alloc(0)
    }

    _concat(arrayOfBuffers) {
        if (arrayOfBuffers.length === 0)
            return this._getEmptyBuffer()
        else
            return Buffer.concat(arrayOfBuffers)
    }
}