import { Encoder } from "../Encoder";

export class PipelineEncoder extends Encoder {
    constructor(potentialEncoder, wireParamEncoder) {
        super()
        this.potentialEncoder = potentialEncoder
        this.wireParamEncoder = wireParamEncoder
    }

    encode(subitem, pipelines, referenceCells, potentialTypes) {
        const { pipelineId, wireColor, wireGauge, potentials, name } = subitem
        const piplineIndex = pipelines.findIndex(({ id }) => id === pipelineId)
        const pipeIdAssigned = Boolean(~piplineIndex)
        return this._concat([
            this._encodeUint8(pipeIdAssigned ? piplineIndex : this.UINT8MAX),
            !pipeIdAssigned ? this._encodeString(name) : this._getEmptyBuffer(),
            this.wireParamEncoder.encode(wireColor, wireGauge),
            this.potentialEncoder.encode(potentials, referenceCells, potentialTypes)
        ])
    }
}