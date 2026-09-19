jest.mock('@react-native-community/geolocation', () => ({
    watchPosition: jest.fn(),
    clearWatch: jest.fn()
}))

import { GetGeolocationTimeDelta } from './GetGeolocationTimeDelta'

describe('GetGeolocationTimeDelta', () => {
    it('compensates for Android location callback age', () => {
        const service = new GetGeolocationTimeDelta()
        const sample = service._getTimeSample({
            timestamp: 100000,
            locationElapsedRealtimeMillis: 5000,
            nativeElapsedRealtimeMillis: 5240,
            nativeTimestamp: 102356
        })

        expect(sample).toEqual({
            delta: -2116,
            deviceTimestamp: 102356
        })
    })

    it('falls back to the callback timestamp when native metadata is unavailable', () => {
        const service = new GetGeolocationTimeDelta()
        const now = 102356
        jest.spyOn(Date, 'now').mockReturnValue(now)

        expect(service._getTimeSample({ timestamp: 100000 })).toEqual({
            delta: -2356,
            deviceTimestamp: now
        })

        Date.now.mockRestore()
    })

    it('ignores samples from an invalid monotonic clock sequence', () => {
        const service = new GetGeolocationTimeDelta()

        expect(service._getTimeSample({
            timestamp: 100000,
            locationElapsedRealtimeMillis: 5240,
            nativeElapsedRealtimeMillis: 5000,
            nativeTimestamp: 102356
        })).toBeNull()
    })
})
