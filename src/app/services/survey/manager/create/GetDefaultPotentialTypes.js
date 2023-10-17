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
                new PotentialType(null, guid(), PermanentPotentialTypeLabels[type], type, false))
    }
}