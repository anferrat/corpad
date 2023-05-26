export const calculateProgress = (status, count, itemType) => {
    if (itemType)
        return count[itemType] === 0 ? 0 : status[itemType][0] / count[itemType]
    else return 0
}

export const getDistance = (d) => {
    if (d) {
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
    else return 'N/A'
}