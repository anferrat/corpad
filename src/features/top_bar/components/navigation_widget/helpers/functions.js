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

export const calculateResultHeading = (heading, bearing, declination) => {
    const rotation = ((bearing - heading + declination) + 360) % 360
    return rotation
}

export const calculateRotationAngle = (prev, diff) => {
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