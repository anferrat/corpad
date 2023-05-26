import { ItemTypes, SubitemTypes } from "../../../../constants/global";
import { Subitem } from "./Subitem";

export class Structure extends Subitem {
    constructor(id, parentId, uid, name, description) {
        super(id, parentId, uid, SubitemTypes.STRUCTURE, ItemTypes.TEST_POINT, name)
        this.description = description
    }
}