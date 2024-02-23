import { Encoder } from "../Encoder"

export class TestPointEncoder extends Encoder {
    constructor(codes) {
        super()
        this.codes = codes
    }


    encode(testPoint) {
        return this._encodeUint8(this.codes.testPointTypes[testPoint.testPointType])
    }
}