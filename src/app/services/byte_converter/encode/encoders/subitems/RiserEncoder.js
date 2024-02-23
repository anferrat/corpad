import { Encoder } from "../Encoder"

export class RiserEncoder extends Encoder {
    constructor(codes, potentialEncoder) {
        super()
        this.codes = codes
        this.potentialEncoder = potentialEncoder
    }

    encode(subitem, pipelines, referenceCells, potentialTypes) {
        const { pipelineId, potentials, nps, name } = subitem
        const piplineIndex = pipelines.findIndex(({ id }) => id === pipelineId)
        const pipeIdAssigned = Boolean(~piplineIndex)
        return this._concat([
            this._encodeUint8(pipeIdAssigned ? piplineIndex : this.UINT8MAX),
            !pipeIdAssigned ? this._encodeString(name) : this._getEmptyBuffer(),
            this._encodeUint8(nps === null ? null : this.codes.pipeSizes[nps]),
            this.potentialEncoder.encode(potentials, referenceCells, potentialTypes)
        ])
    }
}