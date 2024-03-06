import { Encoder } from "../Encoder";

export class StructureEncoder extends Encoder {
    constructor(potentialEncoder) {
        super()
        this.potentialEncoder = potentialEncoder
    }

    encode(subitem, referenceCells, potentialTypes) {
        const { name, description, potentials } = subitem
        return this._concat([
            this._encodeString(name),
            this._encodeString(description),
            this.potentialEncoder.encode(potentials, referenceCells, potentialTypes)
        ])
    }
}