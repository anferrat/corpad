import { PotentialUnits } from "../other/properties"

export class Potential {
    constructor (id, uid, subitemId, value, potentialType, referenceCellId, isPortableReference) {
        this.id = id
        this.uid = uid
        this.subitemId = subitemId
        this.value = value
        this.referenceCellId = referenceCellId
        this.potentialType = potentialType
        this.isPortableReference = isPortableReference
    }
    static unit = PotentialUnits.VOLTS
}
