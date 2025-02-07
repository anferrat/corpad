import Geolocation from '@react-native-community/geolocation'
import { Error, errors } from '../../utils/Error'
import { GetGeolocationTimeDelta } from './GetGeolocationTimeDelta'

export class GeolocationRepository {
    constructor() {
        //Geolocation.setRNConfiguration({ locationProvider: 'playServices' })
        this.getDeltaService = new GetGeolocationTimeDelta()
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

    getDelta(timeout) {
        return this.getDeltaService.execute(timeout)
    }

    getDeclination(latitude, longitude) {
        try {
            /* Declination has an error works only till Dec 10, need to update model
            return geomagnetism.model().point([latitude, longitude]).decl
            */
        }
        catch (er) {
            throw new Error(errors.LOCATION, 'Unable to get declination', er, 801)
        }
    }
}