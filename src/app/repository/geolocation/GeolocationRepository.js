import Geolocation from '@react-native-community/geolocation'
import geomagnetism from 'geomagnetism'
import { Error, errors } from '../../utils/Error'
import { timeFix } from '../../config/geolocation';

export class GeolocationRepository {
    constructor() { 
        //Geolocation.setRNConfiguration({ skipPermissionRequests: false, locationProvider: 'android' })
    }

    async getCurrent() {
        try {
            return await new Promise((resolve, reject) => {
                Geolocation.setRNConfiguration({ skipPermissionRequests: false, locationProvider: 'auto' })
                Geolocation.getCurrentPosition(({ coords: { latitude, longitude, accuracy } }) => resolve({ latitude, longitude, accuracy }),
                    er => reject(er),
                    {
                        timeout: 10000,
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
    }

    watch(callback) {
        Geolocation.setRNConfiguration({ skipPermissionRequests: false, locationProvider: 'auto' })
        const watchId = Geolocation.watchPosition(({ coords: { latitude, longitude, accuracy } }) => {
            callback({ latitude, longitude, accuracy })
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
        return () => Geolocation.clearWatch(watchId)
    }

    getGpsTimeAdjustment(timeout = 10000) {
        //getiing timestamp from GPS
        Geolocation.setRNConfiguration({ skipPermissionRequests: false, locationProvider: 'android' })
        return new Promise((resolve) => {
            Geolocation.getCurrentPosition(({ timestamp }) => {
                resolve({
                    device: Date.now(),
                    gnss: timestamp
                })
            }, () => resolve({ device: null, gnss: null }), { enableHighAccuracy: true, timeout, maximumAge: 0 })
        })
    }

    watchTimeAdjustment(callback) {
        Geolocation.setRNConfiguration({ skipPermissionRequests: false, locationProvider: 'android' })
        const watchId = Geolocation.watchPosition(
            ({ timestamp }) => callback({ gnss: timestamp, device: Date.now() }),
            (er) => { throw new Error(errors.LOCATION, 'Unable to get time adjustment', er, 800) },
            { interval: 100, timeout: 10000, enableHighAccuracy: true, maximumAge: 0 })
        return () => Geolocation.clearWatch(watchId)
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