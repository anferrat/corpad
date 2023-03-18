export const combineLatLon = (lat, lon) => {
    const placeholder = (value) => value === null ? '??.??????' : value
    return lat === null && lon === null ? null : placeholder(lat) + ', ' + placeholder(lon)
}

export const getCountTitle = (count) => {
    if (count !== undefined) {
        return `${count} test point${count !== 1 ? 's' : ''}`
    }
    else return null
}