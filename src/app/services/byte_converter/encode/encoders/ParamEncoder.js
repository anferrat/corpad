import { ExternalLinkTypes } from "../../../../../constants/global"
import { Encoder } from "./Encoder"

export class ParamEncoder extends Encoder {
    constructor(codes) {
        super()
        this.codes = codes
    }

    _getUniqueIdentifier() {
        const id = Math.round((Math.random() * this.UINT32MAX))
        return this._encodeUInt32(id)
    }

    _getTimestamp() {
        const timestamp = Math.round(Date.now() / 1000)
        return this._encodeUInt32(timestamp)
    }

    encode(technician) {
        return this._concat([
            this._encodeUint16(0), //bytes for buffer size. Filled at the end.
            this._getUniqueIdentifier(),
            this._encodeUint8(this.codes.linkTypes[ExternalLinkTypes.NFC]),
            this._encodeString(technician),
            this._encodeUInt32(0), //spare bytes
            this._getTimestamp()
        ])
    }
}