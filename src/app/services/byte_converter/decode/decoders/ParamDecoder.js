import { Error, errors } from "../../../../utils/Error";
import { Decoder } from "./Decoder";
import { DecoderResult } from "./DecoderResult";

export class ParamDecoder extends Decoder {
    constructor(codes) {
        super()
        this.codes = codes
    }

    _verifySize(buf, recordedSize) {
        if (buf.length !== recordedSize)
            throw new Error(errors.GENERAL, 'Unable to decode link', 'Buffer size does not match recorded. Link is damaged', 833)
    }

    _decodeId(buf, initialOffset) {
        return this._decodeUint32(buf, initialOffset)
    }

    _decodeTimestamp(buf, initialOffset) {
        const { value, offset } = this._decodeUint32(buf, initialOffset)
        return new DecoderResult(value * 1000, offset)
    }

    _decodeSize(buf) {
        const { value, offset } = this._decodeUint16(buf, 0)
        return new DecoderResult(value, offset)
    }


    decode(buf) {
        const size = this._decodeSize(buf)
        this._verifySize(buf, size.value)
        const id = this._decodeId(buf, size.offset)
        const linkType = this._decodeUint8(buf, id.offset)
        const technician = this._decodeString(buf, linkType.offset)
        const spare = this._decodeUint32(buf, technician.offset) //spare bytes
        const timestamp = this._decodeTimestamp(buf, spare.offset)
        return new DecoderResult({
            id: id.value,
            linkType: this.codes.linkTypes[linkType.value],
            timestamp: timestamp.value,
            technician: technician.value
        }, timestamp.offset)
    }
}