import { MultimeterCycles, TimeUnits } from "../../../../constants/global";
import { MultimeterCycleLabels, TimeUnitLabels } from "../../../../constants/labels";

export const getCycleTimeLabel = (onTime, offTime) => {
    if (onTime && offTime) { //lazy
        return `${MultimeterCycleLabels[MultimeterCycles.ON]}:  ${Math.floor(onTime / 1000)} ${TimeUnitLabels[TimeUnits.SECONDS]}\n${MultimeterCycleLabels[MultimeterCycles.OFF]}: ${Math.floor(offTime / 1000)} ${TimeUnitLabels[TimeUnits.SECONDS]}`
    }
    else return ''
}

export const formatNumber = (num) => {
    if (num < 10) {
        return num.toFixed(3);
    } else if (num < 100) {
        return num.toFixed(2);
    } else if (num < 1000) {
        return num.toFixed(1);
    } else {
        return num.toFixed(0);
    }
}