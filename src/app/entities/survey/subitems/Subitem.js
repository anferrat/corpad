export class Subitem {
    constructor(id, parentId, uid, type, parentType, name) {
        this.id = id
        this.parentId = parentId
        this.parentType = parentType
        this.uid = uid
        this.type = type
        this.name = name
        this.potentials = []
    }

    setPotentials(potentials) {
        this.potentials = potentials
    }

    calculate() { }

    reset() { }
}

export const SubitemTypes = Object.freeze({
    ANODE: 'AN',
    PIPELINE: 'PL',
    REFERENCE_CELL: 'RE',
    COUPON: 'CN',
    BOND: 'BD',
    SHUNT: 'SH',
    TEST_LEAD: 'OT',
    RISER: 'RS',
    ISOLATION: 'IK',
    STRUCTURE: 'FC',
    CIRCUIT: 'CT'
})