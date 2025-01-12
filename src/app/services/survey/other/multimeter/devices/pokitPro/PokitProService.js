import { MultimeterCaptureRate, MultimeterListenerEvents, MultimeterModes } from "../../../../../../../constants/global"
import { PokitProUUID } from "./constants/PokitProUUID"
import { PokitProConstants } from "./constants/PokitProConstants"
import { PokitProGetDeviceStatus } from "./services/PokitProGetDeviceStatus"
import { DataConverter } from "./helpers/DataConverter"
import { isModeSupported } from "./helpers/IsModeSupported"
import { PokitProAddDSOMetadataListener } from "./services/PokitProAddDSOMetadataListener"
import { PokitProAddToggleListener } from "./services/PokitProAddToggleListener"
import { PokitProAddReadingListener } from "./services/PokitProAddReadingListener"
import { PokitProAddButtonPressListener } from "./services/PokitProAddButtonPressListener"
import { PokitProAutoRange } from "./services/PokitProAutoRange"
import { PokitProLowCurrentConformation } from "./services/PokitProLowCurrentConformation"
import { MultimeterAbstract } from "./MultimeterAbstract"

export class PokitProService extends MultimeterAbstract {
    constructor(bluetoothRepo, warningHandler) {
        super()
        this.bluetoothRepo = bluetoothRepo
        this.UUIDs = new PokitProUUID()
        this.constants = new PokitProConstants()
        this.dataConverter = new DataConverter(this.constants)
        this.pokitProGetDeviceStatusService = new PokitProGetDeviceStatus(bluetoothRepo, this.constants, this.UUIDs, this.dataConverter)
        this.isModeSupportedService = new isModeSupported(this.constants)
        this.pokitProAddDSOMetadataListenerService = new PokitProAddDSOMetadataListener(bluetoothRepo, this.UUIDs, this.dataConverter)
        this.pokitProAddToggleListenerService = new PokitProAddToggleListener(bluetoothRepo, this.UUIDs, this.dataConverter)
        this.pokitProAddReadingListenerService = new PokitProAddReadingListener(bluetoothRepo, this.UUIDs, this.dataConverter)
        this.pokitProAddButtonPressListenerService = new PokitProAddButtonPressListener(bluetoothRepo, this.UUIDs, this.dataConverter)
        this.pokitProAutoRangeService = new PokitProAutoRange(this.constants)
        this.lowCurrentConformationService = new PokitProLowCurrentConformation(warningHandler, this.constants)

        //Current state of Multimeter stored here, toggle status requested before each setting update
        this.COMMAND_LINK_IS_BUSY = false
        this.READING_CAPTURE_TOGGLE_STATUS = null //keep tracks of toggle status during capture, throws on invalid toggle
    }


    async start(peripheralId) {
        await super.connectionWrapper(async () => {
            await this.bluetoothRepo.connect(peripheralId)
            await this.bluetoothRepo.retrieveServices(peripheralId)
            await this.bluetoothRepo.startNotification(peripheralId, this.UUIDs.services.DSO, this.UUIDs.characteristics.DSO.READING)
            await this.bluetoothRepo.startNotification(peripheralId, this.UUIDs.services.DSO, this.UUIDs.characteristics.DSO.METADATA)
            await this.bluetoothRepo.startNotification(peripheralId, this.UUIDs.services.MULTIMETER, this.UUIDs.characteristics.MULTIMETER.READING)
            await this.bluetoothRepo.startNotification(peripheralId, this.UUIDs.services.STATUS, this.UUIDs.characteristics.STATUS.BUTTON_PRESS)
            await this.bluetoothRepo.startNotification(peripheralId, this.UUIDs.services.STATUS, this.UUIDs.characteristics.STATUS.STATUS)
        })
    }

    async stop(peripheralId) {
        await super.connectionWrapper(async () => {
            await this.bluetoothRepo.stopNotification(peripheralId, this.UUIDs.services.DSO, this.UUIDs.characteristics.DSO.READING)
            await this.bluetoothRepo.stopNotification(peripheralId, this.UUIDs.services.DSO, this.UUIDs.characteristics.DSO.METADATA)
            await this.bluetoothRepo.stopNotification(peripheralId, this.UUIDs.services.MULTIMETER, this.UUIDs.characteristics.MULTIMETER.READING)
            await this.bluetoothRepo.stopNotification(peripheralId, this.UUIDs.services.STATUS, this.UUIDs.characteristics.STATUS.BUTTON_PRESS)
            await this.bluetoothRepo.stopNotification(peripheralId, this.UUIDs.services.STATUS, this.UUIDs.characteristics.STATUS.STATUS)
            await this.bluetoothRepo.disconnect(peripheralId)
        })
    }


    async setSettings(peripheralId, mode, range, isSingleRead, rate = MultimeterCaptureRate._60Hz, cycleTime = 1000, internal = false) {
        try {
            if (!this.COMMAND_LINK_IS_BUSY) {
                this.COMMAND_LINK_IS_BUSY = true
                const isConnected = await this.bluetoothRepo.isDeviceConnected(peripheralId)
                if (!isConnected)
                    throw this.constants.errors.NOT_CONNECTED
                //Retrieving toggle status and verifying if toggle in the right position. Also getting current MM status
                const { toggleStatus, status } = await this.pokitProGetDeviceStatusService.execute(peripheralId)
                this.isModeSupportedService.execute(toggleStatus, mode, range)
                if (!internal)
                    await this.lowCurrentConformationService.execute(mode, toggleStatus)
                const isDMMService = (MultimeterModes.POKIT.IDLE === mode && status !== 11) || isSingleRead //status 11 is freeRun DSO status
                //getting payload from setting
                const bytes = isDMMService ? this.dataConverter.DMMPayload(mode, range) : this.dataConverter.DSOSettingPayload(mode, range, rate, cycleTime)
                await this.bluetoothRepo.write(
                    peripheralId,
                    isDMMService ? this.UUIDs.services.MULTIMETER : this.UUIDs.services.DSO,
                    isDMMService ? this.UUIDs.characteristics.MULTIMETER.SETTINGS : this.UUIDs.characteristics.DSO.SETTINGS,
                    bytes,
                    bytes.length
                )
                //Updating state after recieving ACK
                this.READING_CAPTURE_TOGGLE_STATUS = toggleStatus
            }
            else
                throw this.constants.errors.SETTING_UPDATE_FAILED
        }
        catch (er) {
            throw er
        }
        finally {
            this.COMMAND_LINK_IS_BUSY = false
        }

    }

    addListener(peripheralId, mode, range, rate, isSingleRead, cycleTime, onUpdate, onError) {
        let metaData = null
        let metaDataListener
        let readingListener
        let buttonPressListener
        let toggleListener
        let updaingRange = false
        let toggleStatus = this.READING_CAPTURE_TOGGLE_STATUS
        let currentRange = range

        const getMetaData = () => metaData

        const getToggleStatus = () => toggleStatus

        const removeListener = () => {
            metaDataListener ? metaDataListener() : null
            readingListener ? readingListener() : null
            buttonPressListener ? buttonPressListener() : null
            toggleListener ? toggleListener() : null
        }

        const onErrorHandler = (error) => {
            onError(error)
            removeListener()
        }

        const onOverLimit = async () => {
            removeListener()
            this.setSettings(peripheralId, MultimeterModes.POKIT.IDLE, null, null, null, null, true).finally(() => {
                onError(this.constants.errors.OVER_LIMIT)
            })
        }

        const onRangeUpdate = (range) => {
            if (!updaingRange) {
                updaingRange = true
                this.setSettings(peripheralId, mode, range, isSingleRead, rate, cycleTime, true)
                    .then(() => {
                        currentRange = range
                        onUpdate(MultimeterListenerEvents.NEW_RANGE, range)
                    })
                    .catch(er => {
                        onError(this.constants.errors.SETTING_UPDATE_FAILED)
                    }).finally(() => {
                        updaingRange = false
                    })
            }
        }

        metaDataListener = this.pokitProAddDSOMetadataListenerService.addListener(peripheralId, meta => metaData = meta)

        readingListener = this.pokitProAddReadingListenerService.addListener((type, reading) => {
            this.pokitProAutoRangeService.execute(type, reading, currentRange, onRangeUpdate, onOverLimit, getToggleStatus, mode)
            onUpdate(type, reading)
        }, peripheralId, mode, rate, getMetaData)

        toggleListener = this.pokitProAddToggleListenerService.addListener(status => {
            toggleStatus = status
            onUpdate(MultimeterListenerEvents.TOGGLE_ACTION)
            const isSupported = this.isModeSupportedService.isSupported(status, mode, range) //use initial range here, since OL error will be thrown if value exeeded its range
            if (!isSupported)
                onErrorHandler(this.constants.errors.TOGGLE_POSITION)
        }, peripheralId)

        buttonPressListener = this.pokitProAddButtonPressListenerService.addListener(event => {
            onUpdate(MultimeterListenerEvents.BUTTON_PRESS, event)
        }, peripheralId)

        return { remove: removeListener }
    }
}