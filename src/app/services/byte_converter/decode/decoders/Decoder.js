import { DecoderResult } from "./DecoderResult"

export class Decoder {
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

    _verifyResult(value, max) {
        return value === max ? null : value
    }

    _decodeString(buf, offset) {
        const length = Number(buf.readUint8(offset))
        const value = buf.toString('utf8', offset + 1, offset + 1 + length)
        return new DecoderResult(length === this.UINT8MAX || length === 0 ? null : value, offset + 1 + length)
    }

    _decodeUint8(buf, offset) {
        const value = Number(buf.readUint8(offset))
        return new DecoderResult(this._verifyResult(value, this.UINT8MAX), offset + 1)
    }

    _decodeInt32(buf, offset) {
        const value = Number(buf.readInt32LE(offset))
        return new DecoderResult(this._verifyResult(value, this.INT32MAX), offset + 4)
    }

    _decodeUint16(buf, offset) {
        const value = Number(buf.readUInt16LE(offset))
        return new DecoderResult(this._verifyResult(value, this.UINT16MAX), offset + 2)
    }

    _decodeUint32(buf, offset) {
        const value = Number(buf.readUInt32LE(offset))
        return new DecoderResult(this._verifyResult(value, this.UINT32MAX), offset + 4)
    }
}