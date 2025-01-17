import BleManager from 'react-native-ble-manager'
import { bleManagerEmitter } from '../../config/bluetooth'
import { Error, errors } from '../../utils/Error'
import { Platform } from 'react-native'


export class BluetoothRepository {
    constructor() {
        this.onState = 'on'
        this.offState = 'off'
    }

    async init() {
        //Only call this once
        try {
            return await BleManager.start({ shaowAlert: false })
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to initialize bluetooth module', er, 803)
        }
    }

    async scan(serviceUUIDs, seconds, allowDuplicates, options) {
        try {
            return await BleManager.scan(serviceUUIDs, seconds, allowDuplicates, options)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to scan for bluetooth devices', er, 817)
        }
    }

    async stopScan() {
        try {
            return await BleManager.stopScan()
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to stop scan for bluetooth devices', er, 817)
        }
    }

    async connect(deviceId) {
        try {
            //On iOS connection request doesn't timeout. Disconnect manually after timeout
            if (Platform.OS === 'ios' || Platform.OS === 'macos') {
                const connect = async () => {
                    await BleManager.connect(deviceId)
                    return true
                }
                const timeout = () => new Promise(resolve => setTimeout(() => resolve(false), 5000))
                const success = await Promise.race([connect(), timeout()])
                if (!success) {
                    await BleManager.disconnect(deviceId)
                    throw 'Timeout on iOS'
                }
            }
            else return await BleManager.connect(deviceId, { autoconnect: false })
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to connect to the device', er, 802)
        }
    }

    async disconnect(deviceId) {
        try {
            await BleManager.disconnect(deviceId, false)
            if (Platform.OS === 'android')
                await BleManager.removePeripheral(deviceId)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to disconnect from the device', er, 819)
        }
    }

    async checkState() {
        try {
            return await BleManager.checkState()
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to check bluetooth state', er, 804)
        }
    }

    async startNotification(deviceId, serviceUUID, characteristicUUID) {
        try {
            return await BleManager.startNotification(deviceId, serviceUUID, characteristicUUID)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to start notification', er, 805)
        }
    }

    async stopNotification(deviceId, serviceUUID, characteristicUUID) {
        try {
            return await BleManager.stopNotification(deviceId, serviceUUID, characteristicUUID)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to stop notification', er, 806)
        }
    }

    async write(deviceId, serviceUUID, characteristicUUID, data, maxByteSize) {
        try {
            return await BleManager.write(deviceId, serviceUUID, characteristicUUID, data, maxByteSize)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to write to charachteristic', er, 807)
        }
    }

    async read(deviceId, serviceUUID, characteristicUUID) {
        try {
            return await BleManager.read(deviceId, serviceUUID, characteristicUUID)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to read characteristic', er, 810)
        }
    }

    async readRSSI(deviceId) {
        try {
            return await BleManager.readRSSI(deviceId)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to read RSSI data', er, 808)
        }
    }

    async retrieveServices(deviceId, serviceUUIDs = []) {
        try {
            return await BleManager.retrieveServices(deviceId, serviceUUIDs)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to retrieve services', er, 809)
        }
    }


    async getConnectedDevices(serviceUUIDs) {
        try {
            return await BleManager.getConnectedPeripherals(serviceUUIDs)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to get list of connected devices', er, 811)
        }
    }

    async isDeviceConnected(deviceId, serviceUUIDs = []) {
        try {
            return await BleManager.isPeripheralConnected(deviceId, serviceUUIDs)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to confrim if device is connected', er, 812)
        }
    }

    bluetoothStatusListener(callback) {
        try {
            return bleManagerEmitter.addListener('BleManagerDidUpdateState', ({ state }) => {
                callback(state === 'on')
            })
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to detect bluetoth state change', er, 813)
        }
    }

    bluetoothScanStoppedListener(callback) {
        try {
            return bleManagerEmitter.addListener('BleManagerStopScan', callback)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to detect bluetoth state change', er, 814)
        }
    }

    connectedDevicesListener(callback) {
        try {
            return bleManagerEmitter.addListener('BleManagerConnectPeripheral', ({ peripheral }) => callback(peripheral))
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to listen for connected devices', er, 818)
        }
    }

    disconnectedDevicesListener(callback) {
        try {
            return bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', ({ peripheral }) => callback(peripheral))
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to listen for disconnected devices', er, 821)
        }
    }

    discoverPeripheralListener(callback) {
        try {
            return bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', ({ id, name, rssi, advertising: { serviceUUIDs, isConnectable } }) => {
                callback(id, name, rssi, serviceUUIDs, isConnectable)
            })
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to listen for new scanned device', er, 815)
        }
    }

    newCharacteristicValueListener(callback) {
        try {
            return bleManagerEmitter.addListener("BleManagerDidUpdateValueForCharacteristic", (data) => {
                const { value, peripheral, characteristic, service } = data
                callback({ value, peripheral, service, characteristic })
            })
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to listen for new characteristic values', er, 816)
        }
    }
}