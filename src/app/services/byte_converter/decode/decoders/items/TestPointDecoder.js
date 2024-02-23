import { Error, errors } from "../../../../../utils/Error";
import { Decoder } from "../Decoder";
import { DecoderResult } from "../DecoderResult";

export class TestPointDecoder extends Decoder {
    constructor(codes) {
        super()
        this.codes = codes
    }

    decode(buf, initialOffset) {
        const { value, offset } = this._decodeUint8(buf, initialOffset)
        if (this.codes.testPointTypes[value] === undefined)
            throw new Error(errors.VALIDATION, 'Unable to decode test point data', 'Decoded test point type is not valid')
        return new DecoderResult({
            testPointType: this.codes.testPointTypes[value]
        }, offset)
    }
}