export class ReferenceCell {
    constructor(id, uid, rcType, name, isMainReference) {
        this.id = id
        this.uid = uid
        this.rcType = rcType
        this.name = name
        this.isMainReference = Boolean(isMainReference)
        this.isPortable = true
    }
    makeMainReference() {
        this.isMainReference = true
    }
}

export const ReferenceCellTypes = {
    COPPER_SULFATE: 0,
    ZINC: 1,
    SILVER_CHLORIDE: 2,
    SATURATED_CALOMEL: 3,
    NORMAL_HYDROGEN: 4
}