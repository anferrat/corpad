import { Buffer } from "buffer";

export class ByteConverter {
    constructor() { }
//converts byte data to/from multimeter

    convertDataToWrite(byteArray) {
        return Buffer.from(byteArray).toJSON().data
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