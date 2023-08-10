import { MultimeterCycles } from "../../../../../../constants/global"

export class _HighLowCapture {
    constructor() {
    }

    execute(array) {
        if (array.length === 0)
            return { on: null, off: null }
        else {
            let min = array[0]
            let max = array[0]
            for (i = 0; i < array.length; i++) {
                if (array[i] < min)
                    min = array[i]
                else if (array[i] > max)
                    max = array[i]
            }
            return [[MultimeterCycles.ON, min], [MultimeterCycles.OFF, max]]
        }
    }
}