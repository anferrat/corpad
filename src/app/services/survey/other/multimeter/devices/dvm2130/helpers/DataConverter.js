import { MultimeterModes, MultimeterReadingFlags, MultimeterReadingTypes, MultimeterTypes, MultimeterVoltageRanges, PotentialUnits } from "../../../../../../../../constants/global";
import { Reading } from "../../../../../../../entities/survey/multimeter/Reading";

export class DataConverter {
    constructor() {
        this.count = 0
        this.setCount = 0
        this.readings = []
        this.delta = 0
    }

    _getScalingFactor(range) {
        switch (range) {
            case MultimeterVoltageRanges.DVM2130._500mV:
                return 0.5
            case MultimeterVoltageRanges.DVM2130._5V:
                return 5
            case MultimeterVoltageRanges.DVM2130._250V:
                return 250
            default:
                return 0
        }
    }

    _read24BitInt(buffer, offset = 0) {
        const byte1 = buffer[offset];
        const byte2 = buffer[offset + 1];
        const byte3 = buffer[offset + 2];

        let int24 = (byte1 << 16) | (byte2 << 8) | byte3;

        if (int24 & 0x800000) {
            int24 |= 0xFF000000
        }

        return int24
    }

    _throttle(func) {
        if (this.count < 3) {
            this.count++
            return
        }
        else {
            this.count = 0
            return func()
        }
    }

    convertToVoltage(number, range, mode) {
        const max = number > 0 ? 8388608 : 8388607
        const scalingFactor = this._getScalingFactor(range)
        const val = (number / max) * -scalingFactor
        return mode === MultimeterModes.DVM2130.DC_VOLTS ? val : Math.abs(val)
    }

    _readValue(bytes, range, mode) {
        const buf = Buffer.from(bytes)
        const seconds = buf.readUInt32LE()
        const miliseconds = buf.readUint16LE(4)
        const res = Buffer.from([buf[8], buf[7], buf[6]])
        const value = this.convertToVoltage(this._read24BitInt(res), range, mode)
        const flag = this._getFlag(buf.readUint8(9), range)
        return {
            dvmTimestamp: seconds * 1000 + miliseconds,
            value,
            flag
        }
    }

    _getFlag(flagNumber) {
        return flagNumber === 32 ? MultimeterReadingFlags.OVER_RANGE : (flagNumber === 32 && range === MultimeterVoltageRanges.DVM2130._250V ? MultimeterReadingFlags.OVER_LIMIT : null)
    }

    _getSingleRead(bytes, mode, range) {
        const { value, flag } = this._readValue(bytes, range, mode)
        return new Reading(null, value, Date.now(), MultimeterReadingTypes.VOLTAGE, PotentialUnits.VOLTS, flag, mode === MultimeterModes.DVM2130.AC_VOLTS, MultimeterTypes.DVM2130)
    }


    executeForSet(bytes, range) {
        const buf = Buffer.from(bytes)
        const secondBuf = buf.slice(10, 20)
        return [
            this._readValue(buf, range),
            this._readValue(secondBuf, range)
        ]
    }

    execute(bytes, mode, range) {
        return this._throttle(() => this._getSingleRead(bytes, mode, range))
    }

    getDvmTimestamp(bytes) {
        const buf = Buffer.from(bytes.slice(10))
        const seconds = buf.readUInt32LE()
        const miliseconds = buf.readUint16LE(4)
        return seconds * 1000 + miliseconds
    }
}