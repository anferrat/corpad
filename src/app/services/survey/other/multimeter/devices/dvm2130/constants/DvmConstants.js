import { MultimeterModes, MultimeterVoltageRanges } from "../../../../../../../../constants/global";

export class DvmConstants {
    constructor() {
        this.modeBytes = {
            [MultimeterModes.DVM2130.AC_VOLTS]: '0001',
            [MultimeterModes.DVM2130.DC_VOLTS]: '0002',
        }

        this.rangeBytes = {
            [MultimeterVoltageRanges.DVM2130._500mV]: '0001',
            [MultimeterVoltageRanges.DVM2130._5V]: '0002',
            [MultimeterVoltageRanges.DVM2130._250V]: '0003',
        }
    }


}