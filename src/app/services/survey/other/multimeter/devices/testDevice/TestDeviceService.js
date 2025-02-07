import { MultimeterCaptureRate, MultimeterListenerEvents, MultimeterModes, MultimeterReadingTypes, MultimeterToggleStatuses, MultimeterTypes, PotentialUnits } from "../../../../../../../constants/global"
import { Reading } from "../../../../../../entities/survey/multimeter/Reading"
import { ReadingSet } from "../../../../../../entities/survey/multimeter/ReadingSet"
import { MultimeterAbstract } from "../MultimeterAbstract"

export class TestDeviceService extends MultimeterAbstract {
    constructor() {
        super()
    }


    async start() {
        await super.connectionWrapper(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
        })
    }

    async stop() {
        await super.connectionWrapper(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
        })
    }


    async getToggleStatus(peripheralId) {
        return MultimeterToggleStatuses.POKIT.VOLTAGE
    }


    isSupported(toggleStatus, mode, range) {
        return {isValid: true, isSupported: true}
    }


    async setSettings(peripheralId, mode, range, isSingleRead, rate = MultimeterCaptureRate._60Hz, cycleTime = 1000) {
        await new Promise(resolve => setTimeout(resolve, 100))
    }

    addListener(peripheralId, toggleStatus, mode, range, rate, isSingleRead, cycleTime, onUpdate, onError) {
        const on = -1.87
        const off = -0.930
        let count = 0
        const getValue = () => (Math.round((Math.random() * -2) * 1000) / 1000)
        const interval = setInterval(() => {
            count = count + 200
            const value = (count % 5000) <= 1000 ? off : on
            if (isSingleRead) {
                onUpdate(MultimeterListenerEvents.SINGLE_READ, new Reading(null, value, Date.now(), MultimeterReadingTypes.VOLTAGE, PotentialUnits.VOLTS, null, false, MultimeterTypes.POKIT))
            }
            else {
                //onUpdate(MultimeterListenerEvents.READING_SET, new ReadingSet(null, new Array(10).map(() => getValue()), Date.now(), 16.667, MultimeterReadingTypes.VOLTAGE, PotentialUnits.VOLTS, null, false, MultimeterTypes.POKIT))
            }

        }, 200)

        return {
            remove: () => clearInterval(interval)
        }
    }

    addToggleStatusListener(onUpdate, peripheralId) {
        return {
            remove: () => { }
        }
    }
}