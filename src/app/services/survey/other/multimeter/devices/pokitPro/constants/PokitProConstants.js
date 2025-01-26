import { MultimeterCaptureRate, MultimeterCurrentRanges, MultimeterModes, MultimeterToggleStatuses, MultimeterVoltageRanges } from "../../../../../../../../constants/global"
import { Error, errors } from "../../../../../../../utils/Error"

export class PokitProMaxRangeValues {
    constructor() {
        this.VOLTAGE = 600
        this.SMALL_CURRENT = 0.5
        this.LARGE_CURRENT = 10
    }
}


export class PokitProConstants {
    constructor() {
        this.voltageRanges = {
            [MultimeterVoltageRanges.POKIT._250MV]: 0,
            [MultimeterVoltageRanges.POKIT._2V]: 1,
            [MultimeterVoltageRanges.POKIT._10V]: 2,
            [MultimeterVoltageRanges.POKIT._30V]: 3,
            [MultimeterVoltageRanges.POKIT._60V]: 4,
            [MultimeterVoltageRanges.POKIT._125V]: 5,
            [MultimeterVoltageRanges.POKIT._400V]: 6,
            [MultimeterVoltageRanges.POKIT._600V]: 7,
            [MultimeterVoltageRanges.POKIT.AUTO]: 255
        }

        this.currentRanges = {
            [MultimeterCurrentRanges.POKIT._500uA]: 0,
            [MultimeterCurrentRanges.POKIT._2mA]: 1,
            [MultimeterCurrentRanges.POKIT._10mA]: 2,
            [MultimeterCurrentRanges.POKIT._125mA]: 3,
            [MultimeterCurrentRanges.POKIT._300mA]: 4,
            [MultimeterCurrentRanges.POKIT._3A]: 5,
            [MultimeterCurrentRanges.POKIT._10A]: 6,
            [MultimeterCurrentRanges.POKIT.AUTO]: 255
        }

        /*
        this.voltageRangesFromBytes = {
            0: MultimeterVoltageRanges.POKIT._250MV,
            1: MultimeterVoltageRanges.POKIT._2V,
            2: MultimeterVoltageRanges.POKIT._10V,
            3: MultimeterVoltageRanges.POKIT._30V,
            4: MultimeterVoltageRanges.POKIT._60V,
            5: MultimeterVoltageRanges.POKIT._125V,
            6: MultimeterVoltageRanges.POKIT._400V,
            7: MultimeterVoltageRanges.POKIT._600V,
            255: MultimeterVoltageRanges.POKIT.AUTO,
        }

        this.currentRangesFromBytes = {
            0: MultimeterCurrentRanges.POKIT._500uA,
            1: MultimeterCurrentRanges.POKIT._2mA,
            2: MultimeterCurrentRanges.POKIT._10mA,
            3: MultimeterCurrentRanges.POKIT._125mA,
            4: MultimeterCurrentRanges.POKIT._300mA,
            5: MultimeterCurrentRanges.POKIT._3A,
            6: MultimeterCurrentRanges.POKIT._10A,
            255: MultimeterCurrentRanges.POKIT.AUTO,
        }
*/
        this.modes = {
            [MultimeterModes.POKIT.DC_VOLTS]: 1,
            [MultimeterModes.POKIT.AC_VOLTS]: 2,
            [MultimeterModes.POKIT.DC_AMPS]: 3,
            [MultimeterModes.POKIT.AC_AMPS]: 4,
            [MultimeterModes.POKIT.IDLE]: 0
        }       

        this.samplingWindows = { //in microseconds
            [MultimeterCaptureRate._50Hz]: 20000,
            [MultimeterCaptureRate._60Hz]: 16667,
        }

        this.sampleOffsets = { //in ms
            [MultimeterCaptureRate._50Hz]: 20,
            [MultimeterCaptureRate._60Hz]: 16.667,
        }


        this.DSOCommands = {
            'START_CAPTURE': 0x05,
            'STOP_CAPTURE': 0x08
        }

        this.DSOSettingUnknownBytes = {
            'START_CAPTURE': 0x000000FF,
            'STOP_CAPTURE': 0x000001FF
        }

        this.errors = {
            NOT_CONNECTED: new Error(errors.MULTIMETER, 'Setting update failed', 'Multimeter is not connected', 802),
            SETTINGS_INVALID: new Error(errors.MULTIMETER, 'Unable to set settings', 'Invalid input parameters', 852),
            TOGGLE_POSITION: new Error(errors.MULTIMETER, 'Unable to set capture mode', 'Measurement is not supported by selected toggle. Please adjust the toggle', 824),
            OVER_LIMIT: new Error(errors.MULTIMETER, 'Unable to collect readings', 'Over the limit reading is detected', 825),
            AUTO_RANGE: new Error(errors.MULTIMETER, 'Unable to set up new range', 'Error in auto range code', 850),
            SETTING_UPDATE_FAILED: new Error(errors.MULTIMETER, 'Unable update setting', 'Setting updated failed', 851),
            USER_CANCELLED: new Error(errors.MULTIMETER, 'Unable update setting', 'User cancelled operation', 101),
        }
    }
}