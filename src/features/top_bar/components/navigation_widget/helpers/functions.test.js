import {
    calculateTiltCompensatedAngle,
    calculateAngularDistance,
    getNearbyExitRadius,
    getNearbyRadius,
    isNearby,
    normalizeDegrees,
    smoothBearing,
    updateNearbyState
} from './functions'

const identity = {
    qw: 1,
    qx: 0,
    qy: 0,
    qz: 0
}

const zRotation = (degrees) => {
    const radians = degrees * Math.PI / 180
    return {
        qw: Math.cos(radians / 2),
        qx: 0,
        qy: 0,
        qz: Math.sin(radians / 2)
    }
}

describe('navigation widget calculations', () => {
    test('normalizes negative and wrapped angles', () => {
        expect(normalizeDegrees(-90)).toBe(270)
        expect(normalizeDegrees(450)).toBe(90)
    })

    test('smooths bearings across the north boundary', () => {
        expect(smoothBearing(359, 1, 100, 3)).toBeCloseTo(359.7, 1)
        expect(calculateAngularDistance(359, 1)).toBeCloseTo(2)
    })

    test('calculates screen angle for a level device', () => {
        expect(calculateTiltCompensatedAngle(0, identity)).toBeCloseTo(0)
        expect(calculateTiltCompensatedAngle(90, identity)).toBeCloseTo(90)
    })

    test('accounts for device rotation', () => {
        expect(calculateTiltCompensatedAngle(0, zRotation(90))).toBeCloseTo(90)
    })

    test('uses accuracy-aware nearby thresholds with hysteresis', () => {
        expect(getNearbyRadius(4)).toBe(6)
        expect(getNearbyExitRadius(4)).toBe(8)
        expect(isNearby(5, 4)).toBe(true)
        expect(isNearby(7, 4)).toBe(false)
        expect(isNearby(8, 4)).toBe(false)
        expect(updateNearbyState(true, 7, 4)).toBe(true)
        expect(updateNearbyState(true, 8.01, 4)).toBe(false)
        expect(isNearby(0.99, null)).toBe(true)
        expect(isNearby(null, 4)).toBe(false)
    })
})
