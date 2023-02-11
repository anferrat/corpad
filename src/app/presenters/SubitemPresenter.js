import { SubitemTypes } from "../entities/survey/subitems/Subitem";
import { Error } from "../utils/Error";

export class SubitemPresenter {
    constructor () { }

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
                return { name: true, current: true, voltageDrop: true, ratioCurrent: true, ratioVoltage: true, targetMin: true, targetMax: true }
            case SubitemTypes.COUPON:
                return { name: true, area: true, current: true }
            case SubitemTypes.SHUNT:
                return { name: true, ratioVoltage: true, ratioCurrent: true, voltageDrop: true, current: true, factor: true }
            case SubitemTypes.STRUCTURE:
                return { name: true, description: true }
            default: throw new Error('CorpadError', `Subitem type ${subitem.type} is not supported`)
        }
    }

    execute(subitem, pipelineNameAsDefault, subitemList, pipelineList, defaultName) {
        return {
            ...subitem,
            valid: this._getValidObject(subitem),
            pipelineNameAsDefault: pipelineNameAsDefault,
            subitemList: subitemList.map(({ id, name, type }) => ({ id, name, type })),
            pipelineList: pipelineList.map(({ id, name }) => ({ id, name })),
            defaultName: defaultName,
        }
    }

    executeWithUpdate(subitem, timeModified) {
        return {
            subitem: { ...subitem },
            timeModified: timeModified
        }
    }
}