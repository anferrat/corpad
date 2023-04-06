export const roundCoord = (num) => Math.round((num + Number.EPSILON) * 10000000) / 10000000

export const searchMarker = (markers, keyword) => {
    if (keyword === null)
        return markers
    else
        return markers.filter(({ name }) => {
            try {
                if (name !== null) {
                    return name.toLowerCase().includes(keyword.toLowerCase())
                }
                else return false
            }
            catch {
                return false
            }
        })
}