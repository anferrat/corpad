import { PotentialUnits } from "../other/properties"

export class Potential {
    constructor(id, uid, subitemId, value, potentialType, referenceCellId, isPortableReference) {
        this.id = id
        this.uid = uid
        this.subitemId = subitemId
        this.value = value
        this.referenceCellId = referenceCellId
        this.potentialType = potentialType
        this.isPortableReference = isPortableReference
        this.prevValue = null
    }
    static unit = PotentialUnits.VOLTS

    reset() {
        this.prevValue = this.value
        this.value = null
    }
}
