import { SubitemTypes } from "../../../../../constants/global";
import { SoilResistivity } from "../../../../entities/survey/subitems/SoilResistivity";
import { SoilResistivityLayer } from "../../../../entities/survey/subitems/SoilResistivityLayer";

export class ConvertSubitemUnits {
    constructor(unitConverter) {
        this.unitConverter = unitConverter
    }

    execute(subitem, toDefault = true) {
        //converts subitem values to correct units. toDefault=true converts to default units and when false converts from default to output units
        switch (subitem.type) {
            case SubitemTypes.SOIL_RESISTIVITY: {
                const { id, uid, parentId, name, spacingUnit, resistivityUnit, comment } = subitem
                const layers = subitem.layers.map(({ id, uid, parentId, resistanceToZero, resistivityToZero, resistanceToNext, resistivityToNext, spacing }) =>
                    new SoilResistivityLayer(id, uid, parentId,
                        //add unit convertion
                        this.unitConverter.convertLength(spacing, toDefault ? spacingUnit : SoilResistivity.defaultSpacingUnit, toDefault ? SoilResistivity.defaultSpacingUnit : spacingUnit),
                        resistanceToZero,
                        resistanceToNext,
                        this.unitConverter.convertResistivity(resistivityToZero, toDefault ? resistivityUnit : SoilResistivity.defaultResistivityUnit, toDefault ? SoilResistivity.defaultResistivityUnit : resistivityUnit),
                        this.unitConverter.convertResistivity(resistivityToNext, toDefault ? resistivityUnit : SoilResistivity.defaultResistivityUnit, toDefault ? SoilResistivity.defaultResistivityUnit : resistivityUnit),
                    ))
                return new SoilResistivity(id, parentId, uid, name, spacingUnit, resistivityUnit, comment, layers)
            }
            default:
                return subitem
        }
    }
}