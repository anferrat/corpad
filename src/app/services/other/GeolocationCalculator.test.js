import { GeolocationCalculator } from './GeolocationCalculator'

describe('GeolocationCalculator', () => {
    it('calculates a Turf bbox from valid marker coordinates', () => {
        const calculator = new GeolocationCalculator()

        expect(calculator.calculateMarkersBbox([
            { latitude: 10, longitude: 20 },
            { latitude: -5, longitude: 30 },
            { latitude: null, longitude: 100 }
        ])).toEqual([20, -5, 30, 10])
    })

    it('returns an invalid bbox when no marker has coordinates', () => {
        const calculator = new GeolocationCalculator()

        expect(calculator.calculateMarkersBbox([
            { latitude: null, longitude: null }
        ])).toEqual([null, null, null, null])
    })
})
