import Geolocation from '@react-native-community/geolocation'
import { Error, errors } from '../../utils/Error'
import { Platform } from 'react-native'

export class GetGeolocationTimeDelta {
    constructor() {
        this.error_correction = Platform.select({ android: 20, default: 0 })
    }

    async execute(timeout = 10000) {
        try {
            const deltas = []
            let lastDeviceTimestamp
            let watch
            await Promise.race([
                new Promise((resolve, reject) => {
                    watch = Geolocation.watchPosition(({ timestamp }) => {
                        const deviceTimestamp = Date.now()
                        const delta = timestamp - deviceTimestamp
                        deltas.push(delta)
                        lastDeviceTimestamp = deviceTimestamp
                        if (deltas.length >= 7)
                            resolve()
                    },
                        er => reject(er),
                        {
                            enableHighAccuracy: true,
                            maximumAge: 0,
                            interval: 400,
                            distanceFilter: 0,
                            fastestInterval: 400,
                        }
                    )
                }),
                new Promise(resolve => setTimeout(resolve, timeout))
            ])
            Geolocation.clearWatch(watch)
            watch = undefined
            if (deltas.length < 3 || !lastDeviceTimestamp)
                throw 'Timeout error'
            else {
                const delta = this._filterAndAverage(deltas) - this.error_correction
                return {
                    delta,
                    deviceTimestamp: lastDeviceTimestamp
                }
            }
        }
        catch (er) {
            if (watch)
                Geolocation.clearWatch(watch)
            throw new Error(errors.LOCATION, 'Unable to get time delta', er)
        }
    }

    _filterAndAverage(deltas) {
        if (deltas.length === 0) return 0
        if (deltas.length === 1) return deltas[0]
        if (deltas.length === 2) return Math.floor((deltas[0] + deltas[1]) / 2)
        const sorted = [...deltas].sort((a, b) => a - b)
        const median = sorted[Math.floor(sorted.length / 2)]
        const deviations = sorted.map(x => Math.abs(x - median))
        const mad = deviations[Math.floor(deviations.length / 2)]
        const threshold = 1.5 * mad
        const filtered = sorted.filter(x => Math.abs(x - median) <= threshold)
        const average = Math.floor(filtered.reduce((sum, val) => sum + val, 0) / filtered.length)
        return average
    }

}