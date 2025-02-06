import { MultimeterCaptureRate, MultimeterModes, MultimeterVoltageRanges } from "../../../../../../../../constants/global"

export class Commands {
    constructor(bluetoothRepo, uuids, constants) {
        this.bluetoothRepo = bluetoothRepo
        this.uuids = uuids
        this.INIT_BYTES = '03000000' //4 bytes
        this.DMM_MODE = '1c000000' //4 bytes
        this.NOTIFY_MODE = '18000000' //4 bytes
        this.NOTIFY_MODE_2 = '040022000400000001000000'
        this.DMM_MODE_2 = '0c002200080000'
        this.constants = constants
    }

    _getTickBuffer(number) { //4 bytes
        const buf = Buffer.alloc(4)
        buf.writeUint32LE(number)
        return buf.toString('hex')
    }

    _writeToSettings(peripheralId, value) {
        return this.bluetoothRepo.write(peripheralId, this.uuids.services.MAIN, this.uuids.characteristics.SETTINGS, value, 17)
    }

    _getValueFromHex(hex) {
        const buf = Buffer.from(hex, 'hex')
        return buf.toJSON().data
    }


    START_ZZ(peripheralId) { //run after connect
        const value = [0x21] //ZZ
        return this.bluetoothRepo.write(peripheralId, this.uuids.services.MAIN, this.uuids.characteristics.SETTINGS, value, 17)
    }


    START_M(peripheralId, tick) { // M - set frequency - defaults to 60Hz
        const value = this.INIT_BYTES + this.NOTIFY_MODE + this._getTickBuffer(tick) + '100022000400000002000000'
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

   
    START_O(peripheralId, tick) { //O or Q - set MM params - defaults to DC volts and 250 V range
        const value = this.INIT_BYTES + this.DMM_MODE + this._getTickBuffer(tick) + this.DMM_MODE_2 + this.constants.rangeBytes[MultimeterVoltageRanges.DVM2130._250V] + '0000' + this.constants.modeBytes[MultimeterModes.DVM2130.DC_VOLTS] + '000000'
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    START_R(peripheralId, tick) { // R - set start notification
        const value = this.INIT_BYTES + this.NOTIFY_MODE + this._getTickBuffer(tick) + this.NOTIFY_MODE_2
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    STOP_2(peripheralId) { //run before disconnect
        const value = [0x22]
        return this.bluetoothRepo.write(peripheralId, this.uuids.services.MAIN, this.uuids.characteristics.SETTINGS, value, 17)
    }

    STOP_1(peripheralId, tick) {
        const value = '0030000018000000' + this._getTickBuffer(tick) + '040022000400000002000000'
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    SETTING_UPDATE(peripheralId, mode, range, tick) {
        const value = this.INIT_BYTES + this.DMM_MODE + this._getTickBuffer(tick) + this.DMM_MODE_2 + this.constants.rangeBytes[range] + '0000' + this.constants.modeBytes[mode] + '000000'
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    CAPTURE_RATE_UPDATE(peripheralId, rate, tick) {
        const rateBytes = rate === MultimeterCaptureRate._50Hz ? '0001' : '0002'
        const value = this.INIT_BYTES + this.NOTIFY_MODE + this._getTickBuffer(tick) + '10002200040000' + rateBytes + '000000'
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }


    /*

Actually captured commands from official app and unit. 

    START_A(peripheralId, tick) {
        const value = this.INIT_BYTES + this.NOTIFY_MODE + this._getTickBuffer(tick) + '440022000400000000000000'
        console.log(value)
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    START_B(peripheralId, tick) {
        const value = this.INIT_BYTES + this.NOTIFY_MODE + this._getTickBuffer(tick) + '440022000400000003000000' //B - set profile admin?
        console.log(value)
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    START_C(peripheralId, tick) {
        const value = this.INIT_BYTES + this.NOTIFY_MODE + this._getTickBuffer(tick) + '440022000400000000000000' //B - set profile admin?
        console.log(value)
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    START_D(peripheralId, tick) {
        const value = '030000001a000000' + this._getTickBuffer(tick) + '5800220006000000000000000000'
        console.log(value)
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    START_F(peripheralId, tick) {
        const value = this.INIT_BYTES + this.DMM_MODE + this._getTickBuffer(tick) + '0c002200080000000000000000000000'
        console.log(value)
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    START_I(peripheralId, tick) { // L - set smth notify
        const value = '030000002e000000' + this._getTickBuffer(tick) + '480022001a0000000000000005000000000000000000000000000000000000000000'
        console.log(value)
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    START_J(peripheralId, tick) { // L - set smth notify
        const value = '030000002e000000' + this._getTickBuffer(tick) + '480022001a0000000000000004000000000000000000000000000000000000000000'
        console.log(value)
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

     START_L(peripheralId, tick) { // L - set smth notify
        const value = this.INIT_BYTES + this.NOTIFY_MODE + this._getTickBuffer(tick) + '440022000400000001000000'
        console.log(value)
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }

    START_P(peripheralId, tick) {
        const value = this.INIT_BYTES + this.NOTIFY_MODE + this._getTickBuffer(tick) + '5c0022000400000001000000'
        console.log(value)
        return this._writeToSettings(peripheralId, this._getValueFromHex(value))
    }



    Raw data write request bytes: A - R
ZZ 21

A 0300 0000 1800 0000 0000 0000 4400 2200 04 0000 0000 0000 00 – query profile? – first GPS notification after this

resp: 0300 0080 1C00 0000 0100 0000 4400 2200 0000 0000 0400 0000 0300 0000

B 0300 0000 1800 0000 0100 0000 4400 2200 04 0000 0003 0000 00 – set profile

resp: 0300 0080 1C00 0000 0200 0000 0400 2200 0000 0000 0400 0000 0200 0000

C 0300 0000 1800 0000 0200 0000 0400 2200 04 0000 0000 0000 00 – query smth

resp: 0300 0080 1E00 0000 0300 0000 5800 2200 0000 0000 0600 0000 0200 0000 A000

D 0300 0000 1A00 0000 0300 0000 5800 2200 06 0000 0000 0000 0000 00 – query something GPS??

resp: 0300 0080 1E00 0000 0300 0000 5800 2200 0000 0000 0600 0000 0200 0000 A000

E 0300 0000 1800 0000 0400 0000 5C00 2200 04 0000 0000 0000 00 – query smth

F 0300 0000 1800 0000 0500 0000 1000 2200 04 0000 0000 0000 00 – query frequency

G 0300 0000 1C00 0000 0600 0000 0C00 2200 08 0000 0000 0000 0000 0000 00 – query MM params

H 0300 0000 1400 0000 0700 0000 1C00 2200 00 0000 00 – query device name

resp: 0300 0080 3D00 0000 0700 0000 1C00 2200 0000 0000 2500 0000 4456 4D32 3133 3020 3332 3032 3335 3937 0000 0000 4F1F 0300 0000 0000 0000 0000 0000 0000 00

I 0300 0000 2E00 0000 0800 0000 4800 2200 1A 0000 0000 0000 0005 0000 0000 0000 0000 00 0000 0000 0000 0000 0000 0000 – set smth(gps related?)

J 0300 0000 2E00 0000 0900 0000 4800 2200 1A 0000 0000 0000 0004 0000 0000 0000 0000 00 0000 0000 0000 0000 0000 0000– set more gps stuff

Resp: 0300 0080 3200 0000 0800 0000 4800 2200 0000 0000 1A00 0000 0100 0000 0500 0000 0000 0000 0000 0000 1F03 0000 A822 2506 0000

K 0300 0000 2F00 0000 0A00 0000 3000 2200 1B 0000 0000 0000 0000 0000 0000 0000 0000 00 0000 0000 0000 0000 0000 0000 00 – query calibration date

Resp: 0300 0080 3300 0000 0A00 0000 3000 2200 0000 0000 1B00 0000 0000 0000 3131 2F30 352F 3230 3234 2031 303A 3434 3A31 3620 414D 00

L 0300 0000 1800 0000 0B00 0000 4400 2200 04 0000 0001 0000 00 – set smth to notif

M 0300 0000 1800 0000 0C00 0000 1000 2200 04 0000 0001 0000 00 – set frequency

O 0300 0000 1C00 0000 0D00 0000 0C00 2200 08 0000 0002 0000 0002 0000 00 – set mm params (5v, DC)

P 0300 0000 1800 0000 0E00 0000 5C00 2200 04 0000 0001 0000 00 – set start notification??

Q 0300 0000 1C00 0000 0F00 0000 0C00 2200 08 0000 0002 0000 0002 0000 00 – set mm params again(5v, DC)

R 0300 0000 1800 0000 1000 0000 0400 2200 04 0000 0001 0000 00 – set start notification


*/
}