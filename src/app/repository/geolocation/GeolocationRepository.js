import Geolocation from '@react-native-community/geolocation'
import geomagnetism from 'geomagnetism'
import { Error, errors } from '../../utils/Error'
import { timeFix } from '../../config/geolocation';

export class GeolocationRepository {
    constructor() {
        //Geolocation.setRNConfiguration({ locationProvider: 'playServices' })
    }

    async getCurrent() {
        try {
            return await new Promise((resolve, reject) => {
                Geolocation.getCurrentPosition(({ coords: { latitude, longitude, accuracy } }) => resolve({ latitude, longitude, accuracy }),
                    er => reject(er),
                    {
                        timeout: 10000,
                        enableHighAccuracy: true,
                        maximumAge: 10,
                        distanceFilter: 0,
                        showLocationDialog: true,
                        forceRequestLocation: true,
                    })
            })
        }
        catch (er) {
            throw new Error(errors.LOCATION, 'Unable to get current position', er, 800)
        }
    }

    watch(callback) {
        const watchId = Geolocation.watchPosition(({ coords: { latitude, longitude, accuracy } }) => {
            callback({ latitude, longitude, accuracy })
        },
            (er) => {
                throw new Error(errors.LOCATION, 'Unable to obtain current position', er, 800)
            },
            {
                maximumAge: 10000,
                enableHighAccuracy: true,
                distanceFilter: 0,
                fastestInterval: 100,
                interval: 1000,
                timeout: 10000,
            })
        return () => {
            Geolocation.clearWatch(watchId)
        }
    }

    getGpsTimeAdjustment(timeout = 10000) {
        //getiing timestamp from GPS
        //Geolocation.setRNConfiguration({ skipPermissionRequests: false, locationProvider: 'android' })
        return new Promise((resolve) => {
            Geolocation.getCurrentPosition(({ timestamp }) => {
                resolve({
                    device: Date.now(),
                    gnss: timestamp
                })
            }, () => resolve({ device: null, gnss: null }), { enableHighAccuracy: true, maximumAge: 0, timeout })
        })
    }

    recordTimeFix(gnss, device) {
        timeFix.gnss = gnss
        timeFix.device = device
    }

    getTimeFix() {
        return timeFix
    }


    getDeclination(latitude, longitude) {
        try {
            return geomagnetism.model().point([latitude, longitude]).decl
        }
        catch (er) {
            throw new Error(errors.LOCATION, 'Unable to get declination', er, 801)
        }
    }
}