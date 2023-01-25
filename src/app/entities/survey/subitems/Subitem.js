export class Subitem {
    constructor(id, parentId, uid, type, name, timeCreated, timeModified) {
        this.id = id
        this.parentId = parentId
        this.uid = uid
        this.type = type
        this.name = name
        this.timeCreated = timeCreated
        this.timeModified = timeModified
    }

    getSubitem() {
        return this
    }
}