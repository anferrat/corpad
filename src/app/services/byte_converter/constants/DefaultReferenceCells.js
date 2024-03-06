import { ReferenceCellTypes } from "../../../../constants/global";
import { ReferenceCell } from "../../../entities/survey/other/ReferenceCell";

export class DefaultReferenceCells {
    constructor() {
        this.cells = [
            new ReferenceCell(1, 'default-uid-CSE', ReferenceCellTypes.COPPER_SULFATE, 'RC1', false),
            new ReferenceCell(2, 'default-uid-HDR', ReferenceCellTypes.NORMAL_HYDROGEN, 'RC2', false),
            new ReferenceCell(3, 'default-uid-CLM', ReferenceCellTypes.SATURATED_CALOMEL, 'RC3', false),
            new ReferenceCell(4, 'default-uid-CL', ReferenceCellTypes.SILVER_CHLORIDE, 'RC4', false),
            new ReferenceCell(5, 'default-uid-ZRE', ReferenceCellTypes.ZINC, 'RC5', false)
        ]

        this.cellMap = new Map([
            [ReferenceCellTypes.COPPER_SULFATE, this.cells[0]],
            [ReferenceCellTypes.NORMAL_HYDROGEN, this.cells[1]],
            [ReferenceCellTypes.SATURATED_CALOMEL, this.cells[2]],
            [ReferenceCellTypes.SILVER_CHLORIDE, this.cells[3]],
            [ReferenceCellTypes.ZINC, this.cells[4]]]
        )
    }
}