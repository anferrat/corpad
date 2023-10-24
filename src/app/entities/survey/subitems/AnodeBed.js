import { ItemTypes, SubitemTypes } from "../../../../constants/global"
import { Subitem } from "./Subitem"

export class AnodeBed extends Subitem {
    constructor(id, parentId, uid, name, enclosureType, bedType, materialType, anodes) {
        super(id, parentId, uid, SubitemTypes.ANODE_BED, ItemTypes.RECTIFIER, name)
        this.enclosureType = enclosureType
        this.bedType = bedType
        this.materialType = materialType
        this.anodes = anodes
    }

    reset() {
        this.anodes.forEach(anode => anode.reset())
    }
}