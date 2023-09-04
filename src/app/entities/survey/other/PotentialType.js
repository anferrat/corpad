export class PotentialType {
    constructor(id, uid, name, type, isAc) {
        this.id = id
        this.uid = uid
        this.type = type
        this.name = name
        this.isAc = Boolean(isAc)
    }
}