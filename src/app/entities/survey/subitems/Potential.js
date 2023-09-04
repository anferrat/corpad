import { PotentialUnits } from "../../../../constants/global"

export class Potential {
    constructor(id, uid, subitemId, value, potentialType, referenceCellId, isPortableReference, prevValue) {
        this.id = id
        this.uid = uid
        this.subitemId = subitemId
        this.value = value
        this.referenceCellId = referenceCellId
        this.potentialType = potentialType
        this.isPortableReference = isPortableReference
        this.prevValue = prevValue
    }
    static unit = PotentialUnits.VOLTS

    reset() {
        this.prevValue = this.value
        this.value = null
    }
}
