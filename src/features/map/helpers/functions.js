export const roundCoord = (num) => Math.round((num + Number.EPSILON) * 10000000) / 10000000

export const searchMarker = (markers, keyword) => {
    if (keyword === null)
        return markers.filter(({ name, latitude, longitude }) => name !== null && latitude !== null && longitude !== null)
    else
        return markers.filter(({ name, latitude, longitude }) => {
            try {
                if (name !== null && latitude !== null && longitude !== null) {
                    return name.toLowerCase().includes(keyword.toLowerCase())
                }
                else return false
            }
            catch {
                return false
            }
        })
}