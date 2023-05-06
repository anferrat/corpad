import { PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import geomagnetism from 'geomagnetism'
import { Error, errors } from '../../utils/Error'

export class GeolocationRepository {
    constructor() { }

    getPermission() {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            title: "Location permission",
            message: "App reqiures access to location service to display your current position",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
        })
    }

    async getCurrent(permissionGranted) {
        if (permissionGranted)
            try {
                return new Promise((resolve, reject) => {
                    Geolocation.getCurrentPosition(({ coords: { latitude, longitude, accuracy } }) => resolve({ latitude, longitude, accuracy }),
                        er => reject(er),
                        {
                            timeout: 2000,
                            accuracy: { android: 'balanced' },
                            enableHighAccuracy: true,
                            maximumAge: 10,
                            distanceFilter: 0.1,
                            showLocationDialog: true,
                            forceRequestLocation: true,
                        })
                })
            }
            catch (er) {
                throw new Error(errors.LOCATION, 'Unable to get current position', er, 800)
            }
        else
            throw new Error(errors.PERMISSION, 'Unable to obtain location permission', 'Permission not granted', 900)
    }

    watch(permissionGranted, callback) {
        if (permissionGranted) {
            const watchId = Geolocation.watchPosition(({ coords: { latitude, longitude, accuracy } }) => {
                callback({
                    latitude,
                    longitude,
                    accuracy
                })

            },
                (er) => {
                    throw new Error(errors.LOCATION, 'Unable to obtain current position', er, 800)
                },
                {
                    maximumAge: 200,
                    accuracy: { android: 'high' },
                    distanceFilter: 0.1,
                    fastestInterval: 1000,
                    interval: 1000,
                    timeout: 200

                })
            return watchId
        }
        else {
            throw new Error(errors.PERMISSION, 'Unable to obtain location permission', 'Permission not granted', 900)
        }
    }

    clear(watchId) {
        try {
            Geolocation.clearWatch(watchId)
        }
        catch (er) {
            throw new Error(errors.LOCATION, 'Unable to clear location listener', er, 800)
        }
    }

    getDeclination(latitude, longitude) {
        try {
            return geomagnetism.model().point([latitude, longitude]).decl
        }
        catch (er) {
            throw new Error(errors.LOCATION, 'Unable to get declination', er, 800)
        }
    }
}