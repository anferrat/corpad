import BleManager from 'react-native-ble-manager'
import { PermissionsAndroid } from 'react-native'
import { bleManagerEmitter } from '../../config/bluetooth'
import { Error, errors } from '../../utils/Error'


export class BluetoothRepository {
    constructor() {
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

    async connect(deviceId) {
        try {
            return await BleManager.connect(deviceId)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to connect to the device', er, 802)
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

    async startNotificaton(deviceId, serviceUUID, characteristicUUID) {
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
            const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN)
            if (permission === PermissionsAndroid.RESULTS.GRANTED)
                return await BleManager.retrieveServices(deviceId, serviceUUIDs)
            throw new Error(errors.PERMISSION, 'Bluetooth permission is needed', '', 903)
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to retrieve services', er, 809)
        }
    }


    async getConnectedDevices(serviceUUIDs) {
        try {
            const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS['BLUETOOTH_CONNECT'])
            if (permission === PermissionsAndroid.RESULTS.GRANTED)
                return await BleManager.getConnectedPeripherals(serviceUUIDs)
            else throw new Error(errors.PERMISSION, 'Bluetooth permission is needed', '', 903)
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

    bluetoothStateListener(callback) {
        try {
            return bleManagerEmitter.addListener('BleManagerDidUpdateState', ({ state }) => callback(state))
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

    discoverPeripheralListener(callback) {
        try {
            return bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', ({ id, name, rssi, advertising: { serviceUUIDs, isConnectable } }) => { 
                callback(id, name, rssi, serviceUUIDs, isConnectable) })
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to listen for new scanned device', er, 815)
        }
    }

    newCharacteristicValueListener(callback) {
        try {
            return bleManagerEmitter.addListener("BleManagerDidUpdateValueForCharacteristic", ({ value, peripheral, characteristic, service }) => callback(value, peripheral, service, characteristic))
        }
        catch (er) {
            throw new Error(errors.BLUETOOTH, 'Unable to listen for new characteristic values', er, 816)
        }
    }


}