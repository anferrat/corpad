import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import { Error, errors } from '../../utils/Error'

export class Permissions {
    constructor() {
        this.ACCESS_COARSE_LOCATION = PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        this.ACCESS_FINE_LOCATION = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        this.BLUETOOTH_SCAN = PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
        this.BLUETOOTH_CONNECT = PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        this.BLUETOOTH = "android.permission.BLUETOOTH"
        this.BLUETOOTH_ADMIN = "android.permission.BLUETOOTH_ADMIN"
        this.WRITE_EXTERNAL_STORAGE = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        this.IOS_LOCATION_PERMISSION_GRANTED = 'N/A'
    }

    async _isGranted(permission) {
        return (await PermissionsAndroid.request(permission) === PermissionsAndroid.RESULTS.GRANTED)
    }

    async _isGrantedMultiple(permissions) {
        return Object.values(await PermissionsAndroid.requestMultiple(permissions)).every(permission => permission === PermissionsAndroid.RESULTS.GRANTED)
    }

    async _bluetoothAndroid() {
        if (Platform.Version >= 31)
            return await this._isGrantedMultiple([this.BLUETOOTH_SCAN, this.BLUETOOTH_CONNECT])
        else
            return await this._isGrantedMultiple([this.BLUETOOTH, this.ACCESS_FINE_LOCATION, this.BLUETOOTH_ADMIN])
    }

    async _locationAndroid() {
        if (Platform.Version >= 23) {
            return await this._isGranted(this.ACCESS_FINE_LOCATION)
        }
        else return true
    }

    async _storageAndroid() {
        if (Platform.Version >= 19 && Platform.Version <= 29) {
            return await this._isGranted(this.WRITE_EXTERNAL_STORAGE)
        }
        else return true
    }


    async bluetooth() {
        if (Platform.OS === 'android') {
            const granted = await this._bluetoothAndroid()
            if (!granted)
                throw new Error(errors.PERMISSION, 'Unable to obtain bluetooth permission. You need to change bluetooth permission settings in order to use this feature.', 'Permission was not obtained', 903)
        }
    }

    async _locationIos() {
        try {
            switch (this.IOS_LOCATION_PERMISSION_GRANTED) {
                case 'N/A':
                    await Promise.race([
                        new Promise((resolve, reject) => {
                            Geolocation.requestAuthorization(
                                () => {
                                    this.IOS_LOCATION_PERMISSION_GRANTED = true
                                    resolve()
                                },
                                () => {
                                    this.IOS_LOCATION_PERMISSION_GRANTED = false
                                    reject(new Error(errors.PERMISSION, 'Unable to obtain location permission. You need to allow to use location to use this feature.', 'Permission was not obtained', 902))
                                }
                            )
                        }),
                        new Promise((_, reject) => setTimeout(() => reject(new Error(errors.PERMISSION, 'Unable to obtain location permission. You need to allow to use location to use this feature.', 'Permission timeout', 902)), 5000))
                    ])
                    return
                case false:
                    throw new Error(errors.PERMISSION, 'Unable to obtain location permission. You need to allow to use location to use this feature.', 'Permission was not obtained', 902)
            }

        }
        catch (er) {
            throw er
        }

    }

    async location() {
        if (Platform.OS === 'android') {
            const granted = await this._locationAndroid()
            if (!granted)
                throw new Error(errors.PERMISSION, 'Unable to ontain location permission. You need to change location permission settings in order to use this feature.', 'Permission was not obtained', 902)
        }
        else if (Platform.OS === 'ios' || Platform.OS === 'macos') {
            await this._locationIos()
        }
    }

    async storage() {
        if (Platform.OS === 'android') {
            const granted = await this._storageAndroid()
            if (!granted)
                throw new Error(errors.PERMISSION, 'Unable to ontain location permission. You need to change location permission settings in order to use this feature.', 'Permission was not obtained', 902)
        }
    }


}