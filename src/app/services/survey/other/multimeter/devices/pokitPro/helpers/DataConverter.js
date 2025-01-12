import { CurrentUnits, MultimeterButtonEvents, MultimeterCaptureRate, MultimeterModes, MultimeterReadingTypes, PotentialUnits } from "../../../../../../../../constants/global"
import { Reading } from "../../../../../../../entities/survey/multimeter/Reading"
import { ReadingSet } from "../../../../../../../entities/survey/multimeter/ReadingSet"
import { Error, errors } from "../../../../../../../utils/Error"

export class DataConverter {
    constructor(constants) {
        this.constants = constants
    }

    _getRanges(mode) {
        switch (mode) {
            case MultimeterModes.POKIT.AC_VOLTS:
            case MultimeterModes.POKIT.DC_VOLTS:
                return this.constants.voltageRanges
            case MultimeterModes.POKIT.DC_AMPS:
            case MultimeterModes.POKIT.AC_AMPS:
                return this.constants.currentRanges
            default:
                throw new Error(errors.MULTIMETER, 'Unable to obtain ranges for selected mode', 'No range is set for this multimeter mode')
        }
    }

    _getNumberOfReadings(cycleTime, rate) {
        switch (rate) {
            case MultimeterCaptureRate._50Hz:
                return Math.floor((cycleTime / 1000) * 50)
            case MultimeterCaptureRate._60Hz:
            default:
                return Math.floor((cycleTime / 1000) * 60)

        }
    }

    _getUnit(mode) {
        switch (mode) {
            case MultimeterModes.POKIT.AC_AMPS:
            case MultimeterModes.POKIT.DC_AMPS:
                return CurrentUnits.AMPS
            case MultimeterModes.POKIT.AC_VOLTS:
            case MultimeterModes.POKIT.DC_VOLTS:
                return PotentialUnits.VOLTS
            default:
                return null
        }
    }

    _getReadingType(mode) {
        switch (mode) {
            case MultimeterModes.POKIT.AC_AMPS:
            case MultimeterModes.POKIT.DC_AMPS:
                return MultimeterReadingTypes.CURRENT
            case MultimeterModes.POKIT.AC_VOLTS:
            case MultimeterModes.POKIT.DC_VOLTS:
                return MultimeterReadingTypes.VOLTAGE
            default:
                return null
        }
    }

    _getButtonEvent(byte) {
        switch (byte) {
            case 0:
                return MultimeterButtonEvents.MAIN_BUTTON_ON_RELEASE
            case 1:
                return MultimeterButtonEvents.MAIN_BUTTON_ON_PRESS
            case 2:
                return MultimeterButtonEvents.MAIN_BUTTON_ON_LONG_PRESS
            default:
                return MultimeterButtonEvents.UNKNOWN
        }
    }

    _getUpdateRate(mode) {
        switch (mode) {

            case MultimeterModes.POKIT.DC_VOLTS:
            case MultimeterModes.POKIT.DC_AMPS:
                return 100
            case MultimeterModes.POKIT.AC_VOLTS:
            case MultimeterModes.POKIT.AC_AMPS:
                return 250
            default:
                throw new Error(errors.MULTIMETER, 'Unable to obtain ranges for selected mode', 'No range is set for this multimeter mode')
        }
    }

    //OUTGOING DATA CONVERSION

    DSOSettingPayload(mode, range, rate, cycleTime) {
        const buf = Buffer.allocUnsafe(17)
        if (mode === MultimeterModes.POKIT.IDLE) {
            buf.writeUint8(this.constants.DSOCommands.STOP_CAPTURE)
            //4 bytes trigger value float skipped
            buf.writeUInt8(this.constants.modes[mode], 5)
            buf.writeUInt8(2, 6)
            buf.writeUint32LE(100000, 7)
            buf.writeUint16LE(1000, 11)
            buf.writeUint32BE(this.constants.DSOSettingUnknownBytes.STOP_CAPTURE, 13)
        }
        else {
            buf.writeUint8(this.constants.DSOCommands.START_CAPTURE) // command sent to DSO 05 to start, 08 to end
            //4 bytes trigger value float skipped
            buf.writeUInt8(this.constants.modes[mode], 5) //mode - DC, AC volts or DC, AC amps - 01, 02, 03, 04
            buf.writeUInt8(this._getRanges(mode)[range], 6) // range - see constants
            buf.writeUint32LE(cycleTime * 1000, 7) //sampling window in mircoseconds
            buf.writeUint16LE(this._getNumberOfReadings(cycleTime, rate), 11) // number of samples to collect within a sample window
            buf.writeUint32BE(this.constants.DSOSettingUnknownBytes.START_CAPTURE, 13) // unknown bytes, differ depending on command
        }
        return buf.toJSON().data
    }

    DMMPayload(mode, range) {
        const buf = Buffer.allocUnsafe(6)
        if (mode === MultimeterModes.POKIT.IDLE) {
            buf.writeUInt8(this.constants.modes[MultimeterModes.POKIT.IDLE]) // mode - DC, AC volts or DC, AC amps - 01, 02, 03, 04 or 00 for idle
            buf.writeUint8(255, 1) // range - see constants
            buf.writeUint32LE(200, 2)
        }
        else {
            buf.writeUInt8(this.constants.modes[mode]) // mode - DC, AC volts or DC, AC amps - 01, 02, 03, 04
            buf.writeUint8(this._getRanges(mode)[range], 1) // range - see constants
            buf.writeUint32LE(this._getUpdateRate(mode), 2) //update Interval in miliseconds, AC needs larger intervals, otherwise unit connection drops. 500 ms default in the app
        }
        return buf.toJSON().data
    }

    //INCOMING DATA CONVERTION

    DSOMetadataResponse(bytes) {
        const buf = Buffer.from(bytes)
        return {
            status: buf.readUint8(),
            scalingFactor: buf.readFloatLE(1),
            mode: buf.readUint8(5),
            range: buf.readUint8(6),
            samplingWindow: buf.readUint32LE(7),
            numberOfReadings: buf.readUInt16LE(11),
            samplingRate: buf.readUint32LE(13),
            //unknownBytes: 14-17 0x00 0x00 0x00 0xFF
            batchIndex: buf.readUint8(18)
        }
    }

    DSOResponse(bytes, scalingFactor, mode, rate) {
        //Data comes as set of int16 values, that needs to be multiplied on scalling factor, max readings per message is 44 (88 bytes)
        const deviceTimestamp = Date.now()
        const buf = Buffer.from(bytes)
        const length = Math.floor(buf.length / 2)
        const readings = []
        for (i = 0; i < length; i++) {
            const value = buf.readInt16LE(i * 2)
            readings.push(value * scalingFactor)
        }
        return new ReadingSet(readings, deviceTimestamp, this.constants.sampleOffsets[rate], this._getReadingType(mode), this._getUnit(mode), null)
    }

    DMMResponse(bytes, mode) {
        const buf = Buffer.from(bytes)
        const status = buf.readUint8(bytes) //first byte is autorange on/off for DC and AC voltage and current
        const data = {
            isError: status === 255,
            autoRange: Boolean(status),
            value: buf.readFloatLE(1), // value of multimeter reading,
            mode: buf.readUint8(5), //current mode of DMM. need to convert to constants if want to use,
            range: buf.readUint8(6), //current range 
        }
        return new Reading(data.value, Date.now(), this._getReadingType(mode), this._getUnit(mode), null)
    }

    statusResponse(bytes) {
        const buf = Buffer.from(bytes)
        return {
            status: Number(buf.readUInt8()),
            battery: Number(buf.readFloatLE(1).toFixed(3)),
            toggleStatus: Number(buf.readUInt8(6))
        }
    }

    buttonStatusResponse(bytes) {
        const buf = Buffer.from(bytes)
        return {
            //firs byte is uknown. equals 2
            event: this._getButtonEvent(buf.readUInt8(1))
        }
    }
}