import { PermanentPotentialTypes } from "../../../../../constants/global"
import { guid } from "../../../../utils/guid"
import { PermanentPotentialTypeLabels } from "../../../../../constants/labels"
import { PotentialType } from "../../../../entities/survey/other/PotentialType"

export class GetDefaultPotentialTypes {
    constructor() {

    }
    execute() {
        return Object.values(PermanentPotentialTypes)
            .map(type =>
                new PotentialType(null, guid(), PermanentPotentialTypeLabels[type], type, type === PermanentPotentialTypes.AC))
    }

    getMissingDefaultTypes(potentialTypes) {
        const defTypes = this.execute()
        const typeSet = new Set(potentialTypes.map(({ type }) => type))
        return defTypes.filter(defType => !typeSet.has(defType.type))
    }
}