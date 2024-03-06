import { Decoder } from "../../Decoder";
import { DecoderResult } from "../../DecoderResult";

export class PotentialDecoder extends Decoder {
    constructor(codes) {
        super()
        this.codes = codes
    }

    _decodePotential(buf, offset) {
        const isPortable = this._decodeUint8(buf, offset)
        const referenceCellId = this._decodeUint8(buf, isPortable.offset)
        const permanentPotentialType = this._decodeUint8(buf, referenceCellId.offset)
        const value = this._decodeInt32(buf, permanentPotentialType.offset)
        return new DecoderResult({
            isPortableReference: Boolean(isPortable.value),
            referenceCellId: isPortable.value ? null : referenceCellId.value,
            rcType: isPortable ? this.codes.referenceCellTypes[referenceCellId.value] ?? null : null,
            permanentPotentialType: this.codes.potentialTypes[permanentPotentialType.value] ?? null,
            value: value.value === null ? null : value.value / 1000
        }, value.offset)
    }

    decode(buf, initialOffset) {
        const numberOfPotentials = this._decodeUint8(buf, initialOffset)
        const potentials = []
        let offset = numberOfPotentials.offset
        for (let i = 0; i < numberOfPotentials.value; i++) {
            const potential = this._decodePotential(buf, offset)
            potentials.push(potential.value)
            offset = potential.offset
        }
        return new DecoderResult(potentials, offset)
    }
}