import { MultimeterCharacteristics, MultimeterServices, MultimeterTypes } from "../../../constants/global"
import { Error, errors } from "../../utils/Error"
import { Buffer } from "buffer"

export class PokitMultimeterService {
    constructor(bluetoothRepo, settingRepo) {
        this.bluetoothRepo = bluetoothRepo
        this.settingRepo = settingRepo
        this.multimeterServices = MultimeterServices[MultimeterTypes.POKIT]
        this.multimeterCharacteristics = MultimeterCharacteristics[MultimeterTypes.POKIT]
        this.BYTE_DATA = {
            MULTIMETER_SERVICE: {
                SETTING_SETUP: { //6 bytes
                    IDLE: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
                    DC_VOLTAGE: [0x1, 0xFF, 0x00, 0x00, 0x01, 0x4F],
                }
            }
        }
    }

    async _getPeripheralId() {
        const { multimeter } = await this.settingRepo.get()
        if (multimeter.peripheralId)
            return multimeter.peripheralId
        else throw new Error(errors.GENERAL, 'No paired multimeters found')
    }

    async requestVolatgeReading() {
        const id = await this._getPeripheralId()
        await this.bluetoothRepo.retrieveServices(id)

        const clock = setInterval(async () => {
            await this.bluetoothRepo.write(
                id,
                this.multimeterServices.MULTIMETER,
                this.multimeterCharacteristics.MULTIMETER.SETTINGS,
                Buffer.from(this.BYTE_DATA.MULTIMETER_SERVICE.SETTING_SETUP.DC_VOLTAGE).toJSON().data, 6)

            console.log('Measurement requested')
        }, 500)
        setTimeout(() => {
            clearInterval(clock)
        }, 10000)

        /*  const listen = this.bluetoothRepo.newCharacteristicValueListener(data => {
              console.log(`please report me I'm here`)
              console.log(data)
          })
  /*
          setTimeout(async () => {
              
              await this.bluetoothRepo.stopNotification(id, this.multimeterServices.MULTIMETER, this.multimeterCharacteristics.MULTIMETER.READING)
              listen.remove()
              console.log('Measurement stopped')
          }, 5000)
  */
    }



    async addVoltageListener() {
        const id = await this._getPeripheralId()
        await this.bluetoothRepo.retrieveServices(id)
        await this.bluetoothRepo.startNotification(id, this.multimeterServices.MULTIMETER, this.multimeterCharacteristics.MULTIMETER.READING)
        console.log('notification started successfully')
        return this.bluetoothRepo.newCharacteristicValueListener(({ value, peripheral, characteristic, service }) => {
            const buf = Buffer.from(value)
            console.log(value)
            const volts = buf.readFloatLE(1)
            console.log('volts ', volts)
        })
    }


}