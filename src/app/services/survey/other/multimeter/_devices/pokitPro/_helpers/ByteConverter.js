import { Buffer } from "buffer";

export class ByteConverter {
    constructor(settings) {
        this.settings = settings
    }
    //converts byte data to/from multimeter

    convertDataToWrite(byteArray) {
        return Buffer.from(byteArray).toJSON().data
    }

    convertMultimeterServiceSettings(measurementSettings, range = 0, updateInterval = 0) {
        const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
        if (measurementSettings !== this.settings.IDLE) {
            buf.writeUint8(measurementSettings)
            buf.writeUint8(range, 1)
            buf.writeUint32LE(updateInterval, 2)
        }
        return buf.toJSON().data
    }

    convertStatus(statusByteArray) {
        const buf = Buffer.from(statusByteArray)
        return {
            status: Number(buf.readUInt8()),
            battery: Number(buf.readFloatLE(1).toFixed(3)),
            mode: Number(buf.readUInt8(6))
        }
    }

    convertReading(readingByteArray) {
        const buf = Buffer.from(readingByteArray)
        return {
            autoRange: Boolean(buf.readUInt8()),
            value: Number(buf.readFloatLE(1)),
            type: Number(buf.readUInt8(5)),
            range: Number(buf.readUInt8(6)),
        }
    }
}