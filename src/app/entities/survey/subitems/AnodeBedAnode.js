export class AnodeBedAnode {
    constructor(id, uid, parentId, current, wireColor, wireGauge) {
        this.id = id
        this.uid = uid
        this.parentId = parentId
        this.current = current
        this.wireColor = wireColor
        this.wireGauge = wireGauge
    }

    reset() {
        this.current = null
    }
}