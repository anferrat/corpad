export const getCardinalDirection = (degree) => {
    if (degree >= 338 || degree < 23)
        return 'North'
    else if (degree >= 23 && degree < 68)
        return 'Northeast'
    else if (degree >= 68 && degree < 113)
        return 'East'
    else if (degree >= 113 && degree < 158)
        return 'Southeast'
    else if (degree >= 158 && degree < 203)
        return 'South'
    else if (degree >= 203 && degree < 248)
        return 'Southwest'
    else if (degree >= 248 && degree < 293)
        return 'West'
    else return 'Northwest'
}

export const NEARBY_DISTANCE = 1
export const NEARBY_ACCURACY_MULTIPLIER = 1.5

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const getNearbyRadius = (accuracy) => Number.isFinite(accuracy) && accuracy > 0
    ? Math.max(NEARBY_DISTANCE, accuracy * NEARBY_ACCURACY_MULTIPLIER)
    : NEARBY_DISTANCE

export const getNearbyExitRadius = (accuracy) => getNearbyRadius(accuracy) + (
    Number.isFinite(accuracy) && accuracy > 0 ? Math.max(1, accuracy * 0.5) : 1)

export const updateNearbyState = (nearby, distance, accuracy) => {
    if (!Number.isFinite(distance))
        return false

    const radius = nearby ? getNearbyExitRadius(accuracy) : getNearbyRadius(accuracy)
    return distance <= radius
}

export const isNearby = (distance, accuracy) => updateNearbyState(false, distance, accuracy)

export const normalizeDegrees = (degree) => {
    'worklet'
    return ((degree % 360) + 360) % 360
}

export const createBearingVector = (bearing) => {
    'worklet'
    const radians = bearing * Math.PI / 180
    return {
        x: Math.sin(radians),
        y: Math.cos(radians),
        z: 0
    }
}

export const getBearingSmoothingFactor = (distance, accuracy) => {
    if (!Number.isFinite(distance) || !Number.isFinite(accuracy) || accuracy <= 0)
        return 0.2

    const confidence = distance / (distance + accuracy)
    return clamp(0.08 + confidence * 0.27, 0.08, 0.35)
}

export const smoothBearing = (previous, next, distance, accuracy) => {
    if (!Number.isFinite(next))
        return previous
    if (!Number.isFinite(previous))
        return normalizeDegrees(next)

    const alpha = getBearingSmoothingFactor(distance, accuracy)
    const previousVector = createBearingVector(previous)
    const nextVector = createBearingVector(next)
    const x = previousVector.x * (1 - alpha) + nextVector.x * alpha
    const y = previousVector.y * (1 - alpha) + nextVector.y * alpha

    if (Math.hypot(x, y) < 0.0001)
        return normalizeDegrees(next)

    return normalizeDegrees(Math.atan2(x, y) * 180 / Math.PI)
}

export const calculateAngularDistance = (from, to) => {
    'worklet'
    return Math.abs(((to - from + 540) % 360) - 180)
}

const normalizeQuaternion = ({ qw, qx, qy, qz }) => {
    'worklet'
    if (![qw, qx, qy, qz].every(Number.isFinite))
        return null

    const length = Math.hypot(qw, qx, qy, qz)
    if (length === 0)
        return null

    return {
        qw: qw / length,
        qx: qx / length,
        qy: qy / length,
        qz: qz / length
    }
}

const conjugateQuaternion = (quaternion) => {
    'worklet'
    return {
        qw: quaternion.qw,
        qx: -quaternion.qx,
        qy: -quaternion.qy,
        qz: -quaternion.qz
    }
}

const rotateVector = (vector, quaternion) => {
    'worklet'
    const qVector = {
        x: quaternion.qx,
        y: quaternion.qy,
        z: quaternion.qz
    }
    const cross = (left, right) => {
        'worklet'
        return {
            x: left.y * right.z - left.z * right.y,
            y: left.z * right.x - left.x * right.z,
            z: left.x * right.y - left.y * right.x
        }
    }
    const twiceCross = cross(qVector, vector)
    twiceCross.x *= 2
    twiceCross.y *= 2
    twiceCross.z *= 2
    const secondCross = cross(qVector, twiceCross)

    return {
        x: vector.x + quaternion.qw * twiceCross.x + secondCross.x,
        y: vector.y + quaternion.qw * twiceCross.y + secondCross.y,
        z: vector.z + quaternion.qw * twiceCross.z + secondCross.z
    }
}

export const transformWorldVectorToDevice = (vector, attitude) => {
    'worklet'
    const quaternion = normalizeQuaternion(attitude)
    if (quaternion === null)
        return null

    return rotateVector(vector, conjugateQuaternion(quaternion))
}

export const calculateTiltCompensatedAngle = (bearing, attitude) => {
    'worklet'
    if (!Number.isFinite(bearing) || !attitude)
        return null

    const deviceVector = transformWorldVectorToDevice(createBearingVector(bearing), attitude)
    if (deviceVector === null || Math.hypot(deviceVector.x, deviceVector.y) < 0.0001)
        return null

    // The device x/y axes are the screen's horizontal/vertical axes. A vector pointing up is 0 degrees.
    return normalizeDegrees(Math.atan2(deviceVector.x, deviceVector.y) * 180 / Math.PI)
}

export const calculateRotationAngle = (prev, diff) => {
    'worklet'
    if (prev === null)
        return diff
    else {
        const loopIndex = (prev - prev % 360) / 360
        const displacement = prev % 360 - diff
        if (Math.abs(displacement) < 180)
            return loopIndex * 360 + diff
        else {
            const round = displacement > 0 ? 1 : -1
            return (loopIndex + round) * 360 + diff
        }
    }
}

export const getDistance = (d) => {
    const dR = Math.round(d)
    if (dR === -1)
        return '-'
    if (dR === 0)
        return '< 1 m'
    else if (dR > 0 && dR < 1000)
        return dR.toString() + ' m'
    else if (dR > 999 && dR < 10000)
        return (dR / 1000).toPrecision(3) + ' km'
    else if (dR > 10000 && dR < 100000)
        return Math.round(dR / 1000).toString() + ' km'
    else if (dR > 100000)
        return '> 100 km'
}
