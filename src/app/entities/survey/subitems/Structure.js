import { Subitem } from "./Subitem";

export class Structure extends Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified, description) {
        super(id, parentId, uid, type, name, timeCreated, timeModified)
        this.description = description
    }
}