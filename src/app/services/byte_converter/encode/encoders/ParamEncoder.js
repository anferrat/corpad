import { ExternalLinkTypes } from "../../../../../constants/global"
import { Encoder } from "./Encoder"

export class ParamEncoder extends Encoder {
    constructor() {
        super()
    }

    _getUniqueIdentifier() {
        const id = Math.round((Math.random() * this.UINT32MAX))
        return this._encodeUInt32(id)
    }

    _getTimestamp() {
        const timestamp = Math.round(Date.now() / 1000)
        return this._encodeUInt32(timestamp)
    }

    encode() {
        return this._concat([
            this._getUniqueIdentifier(),
            this._encodeUint8(ExternalLinkTypes.NFC),
            this._encodeUInt32(0), //spare bytes
            this._getTimestamp()
        ])
    }
}