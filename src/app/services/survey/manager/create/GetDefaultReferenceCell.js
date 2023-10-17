import { ReferenceCellTypes } from "../../../../../constants/global"
import { ReferenceCell } from "../../../../entities/survey/other/ReferenceCell"
import { guid } from "../../../../utils/guid"

export class GetDefaultReferenceCell {
    constructor() {
    }

    execute() {
        return new ReferenceCell(null, guid(), ReferenceCellTypes.COPPER_SULFATE, 'RC1', true)
    }
}