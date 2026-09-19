import Geolocation from '@react-native-community/geolocation'
import { Error, errors } from '../../utils/Error'

export class GetGeolocationTimeDelta {
    async execute(timeout = 10000) {
        let watch
        try {
            const deltas = []
            let lastDeviceTimestamp
            await Promise.race([
                new Promise((resolve, reject) => {
                    watch = Geolocation.watchPosition(position => {
                        const sample = this._getTimeSample(position)
                        if (!sample)
                            return
                        deltas.push(sample.delta)
                        lastDeviceTimestamp = sample.deviceTimestamp
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
                const delta = this._filterAndAverage(deltas)
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

    _getTimeSample({ timestamp, locationElapsedRealtimeMillis, nativeElapsedRealtimeMillis, nativeTimestamp }) {
        if (!Number.isFinite(timestamp))
            return null

        if (Number.isFinite(locationElapsedRealtimeMillis) &&
            Number.isFinite(nativeElapsedRealtimeMillis) &&
            Number.isFinite(nativeTimestamp)) {
            const locationAge = nativeElapsedRealtimeMillis - locationElapsedRealtimeMillis
            if (locationAge < 0)
                return null
            return {
                delta: timestamp + locationAge - nativeTimestamp,
                deviceTimestamp: nativeTimestamp
            }
        }

        const deviceTimestamp = Date.now()
        return {
            delta: timestamp - deviceTimestamp,
            deviceTimestamp
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
