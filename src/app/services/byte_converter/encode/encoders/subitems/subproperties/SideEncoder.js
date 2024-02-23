import { Error, errors } from "../../../../../../utils/Error"
import { Encoder } from "../../Encoder"

export class SideEncoder extends Encoder {
    constructor() {
        super()
    }

    _createSideArray(side, subitems) {
        return side.map(id => subitems.findIndex((subitem) => subitem.id === id)).filter(side => ~side)
    }

    _encodeSide(sideArray) {
        if (sideArray.length === 0)
            return this._encodeUint8(0)
        else if (sideArray.length > this.UINT8MAX - 1)
            throw new Error(errors.GENERAL, 'Unable to encode array', 'Side count limit is reached')
        return this._concat([
            this._encodeUint8(sideArray.length),
            this._concat(sideArray.map(index => this._encodeUint8(index)))
        ])
    }


    encode(side, subitems) {
        return this._encodeSide(this._createSideArray(side, subitems))
    }

}