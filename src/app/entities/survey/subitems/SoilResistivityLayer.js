export class SoilResistivityLayer {
    constructor(id, uid, parentId, spacing, resistanceToZero, resistanceToNext, resistivityToZero, resistivityToNext) {
        this.id = id
        this.uid = uid
        this.parentId = parentId
        this.spacing = spacing
        this.resistanceToZero = resistanceToZero
        this.resistanceToNext = resistanceToNext
        this.resistivityToZero = resistivityToZero
        this.resistivityToNext = resistivityToNext
    }
}