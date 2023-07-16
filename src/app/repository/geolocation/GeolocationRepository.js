import Geolocation from 'react-native-geolocation-service';
//rn comunity is used for GNSS time capturing only (using Android API), geolocation-service is used for coordinated (using fused API)
import GeolocationTime from '@react-native-community/geolocation'
import geomagnetism from 'geomagnetism'
import { Error, errors } from '../../utils/Error'
import { timeFix } from '../../config/geolocation';

export class GeolocationRepository {
    constructor() { }

    async getCurrent() {
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
    }

    watch(callback) {
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
        return new Promise((resolve) => {
            GeolocationTime.getCurrentPosition(({ timestamp }) => {
                resolve({
                    device: Date.now(),
                    gnss: timestamp
                })
            }, () => resolve({ device: null, gnss: null }), { enableHighAccuracy: true, timeout, maximumAge: 0 })
        })
    }

    watchTimeAdjustment(callback) {
        const watchId = GeolocationTime.watchPosition(
            ({ timestamp }) => callback({ gnss: timestamp, device: Date.now() }),
            (er) => { throw new Error(errors.LOCATION, 'Unable to get time adjustment', er, 800) },
            { interval: 100, timeout: 10000, enableHighAccuracy: true, maximumAge: 0 })
        return () => GeolocationTime.clearWatch(watchId)
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