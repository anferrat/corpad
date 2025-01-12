import { TimeUnits } from "../../../../../constants/global"
import { TimeUnitLabels } from "../../../../../constants/labels"

export const standardCycleTimes =
    [
        { on: 2500, off: 500, title: `2.5 | 0.5 ${TimeUnitLabels[TimeUnits.SECONDS]}` },
        { on: 3000, off: 1000, title: `3 | 1 ${TimeUnitLabels[TimeUnits.SECONDS]}` },
        { on: 4000, off: 1000, title: `4 | 1 ${TimeUnitLabels[TimeUnits.SECONDS]}` },
        { on: 4000, off: 2000, title: `4 | 2 ${TimeUnitLabels[TimeUnits.SECONDS]}` },
        { on: 5000, off: 1000, title: `5 | 1 ${TimeUnitLabels[TimeUnits.SECONDS]}` },
        { on: 8000, off: 2000, title: `8 | 2 ${TimeUnitLabels[TimeUnits.SECONDS]}` },
    ]
