import { SubitemTypes } from "../../constants/global";
import { Error, errors } from "../utils/Error";

export class SubitemPresenter {
    constructor() { }

    _getValidObject(subitem) {
        switch (subitem.type) {
            case SubitemTypes.ANODE:
            case SubitemTypes.PIPELINE:
            case SubitemTypes.REFERENCE_CELL:
            case SubitemTypes.RISER:
            case SubitemTypes.TEST_LEAD:
                return { name: true }
            case SubitemTypes.BOND:
            case SubitemTypes.ISOLATION:
                return { name: true, current: true }
            case SubitemTypes.CIRCUIT:
                return { name: true, current: true, voltage: true, voltageDrop: true, ratioCurrent: true, ratioVoltage: true, targetMin: true, targetMax: true }
            case SubitemTypes.COUPON:
                return { name: true, area: true, current: true }
            case SubitemTypes.SHUNT:
                return { name: true, ratioVoltage: true, ratioCurrent: true, voltageDrop: true, current: true, factor: true }
            case SubitemTypes.STRUCTURE:
                return { name: true, description: true }
            case SubitemTypes.ANODE_BED:
                return { name: true, anodes: subitem.anodes.map(() => ({ current: true })) }
            case SubitemTypes.SOIL_RESISTIVITY:
                return { name: true, comment: true, layers: subitem.layers.map(() => ({ spacing: true, resistanceToZero: true })) }
            default: throw new Error(errors.GENERAL, `Subitem type ${subitem.type} is not supported`, 'Wrong subitem type', 109)
        }
    }

    _presentSubitem(subitem) {
        return subitem
    }

    execute(subitem, pipelineNameAsDefault, subitemList, pipelineList, defaultName) {
        return {
            ...this._presentSubitem(subitem),
            valid: this._getValidObject(subitem),
            pipelineNameAsDefault: pipelineNameAsDefault,
            subitemList: subitemList.map(({ id, name, type }) => ({ id, name, type })),
            pipelineList: pipelineList.map(({ id, name }) => ({ id, name })),
            defaultName: defaultName,
        }
    }

    executeWithUpdate(subitem, timeModified) {
        return {
            subitem: {
                ...this._presentSubitem(subitem),
                valid: this._getValidObject(subitem)
            },
            timeModified: timeModified
        }
    }

    executeWithList(subitems, pipelineList, referenceCells, potentialUnit, availableMeasurementTypes) {
        return {
            subitems: subitems.map(subitem => ({ ...this._presentSubitem(subitem), valid: this._getValidObject(subitem) })),
            pipelineList: pipelineList.map(({ id, name }) => ({ id, name })),
            potentialUnit: potentialUnit,
            referenceCells: referenceCells,
            availableMeasurementTypes
        }
    }
}