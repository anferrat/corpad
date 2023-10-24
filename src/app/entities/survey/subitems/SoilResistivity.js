import { ItemTypes, LengthUnits, ResistivityUnits, SubitemTypes } from "../../../../constants/global";
import { SoilResistivityLayer } from "./SoilResistivityLayer";
import { Subitem } from "./Subitem";

export class SoilResistivity extends Subitem {
    constructor(id, parentId, uid, name, spacingUnit, resistivityUnit, comment, layers) {
        super(id, parentId, uid, SubitemTypes.SOIL_RESISTIVITY, ItemTypes.TEST_POINT, name)
        this.spacingUnit = spacingUnit
        this.resistivityUnit = resistivityUnit
        this.comment = comment
        this.layers = layers
        this.valid = false
    }
    static defaultSpacingUnit = LengthUnits.METERS
    static defaultResistivityUnit = ResistivityUnits.OHM_METERS

    reset() {
        this.layers = []
        this.comment = null
    }

    _calculateResistivity(resistance, spacing) {
        return 2 * Math.PI * spacing * resistance
    }

    _calculateLayerResistance(r1, r2) {
        return (r1 * r2) / (r1 - r2)
    }

    calculate() {
        this.layers.sort((a, b) => a.spacing - b.spacing)
        const result = []
        for (i = 0; i < this.layers.length; i++) {
            const { spacing, resistanceToZero, id, uid, parentId } = this.layers[i]
            if (!spacing || !resistanceToZero || i + 1 === this.layers.length || spacing === this.layers[i + 1].spacing || !this.layers[i + 1].resistanceToZero)
                if (i + 1 === this.layers.length) {
                    const resistivityToZero = this._calculateResistivity(resistanceToZero, spacing)
                    result.push(new SoilResistivityLayer(id, uid, parentId, spacing, resistanceToZero, null, resistivityToZero, null))
                }
                else
                    continue
            else {
                const resistanceToNext = this._calculateLayerResistance(resistanceToZero, this.layers[i + 1].resistanceToZero)
                const resistivityToZero = this._calculateResistivity(resistanceToZero, spacing)
                const resistivityToNext = this._calculateResistivity(resistanceToNext, this.layers[i + 1].spacing - spacing)
                result.push(new SoilResistivityLayer(id, uid, parentId, spacing, resistanceToZero, resistanceToNext, resistivityToZero, resistivityToNext))

            }
        }
        this.layers = result
    }
}

