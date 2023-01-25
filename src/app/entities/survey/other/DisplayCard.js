import { Subitem } from "../subitems/Subitem"

export class DisplayCardReading extends Subitem {
    constructor(id, uid, parentId, subitemType, name, v1, v2) {
        super(id, parentId, uid, subitemType, name)
        this.v1 = v1
        this.v2 = v2
    }
}