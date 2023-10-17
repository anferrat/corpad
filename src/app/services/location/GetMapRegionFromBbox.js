export class GetMapRegionFromBbox {
    constructor() {
        this.DEFAULT_REGION = {
            latitude: 38.910594121910854,
            latitudeDelta: 69.4862269475757,
            longitude: -101.67061429470778,
            longitudeDelta: 58.88461388647556
        }
        this.PADDING = 1.1
    }

    execute(bbox) {
        const [minLon, minLat, maxLon, maxLat] = bbox
        if (maxLat || maxLat === 0 && minLat || minLat === 0 && maxLon || maxLon === 0 && minLon || minLon === 0) {
            const midLat = (minLat + maxLat) / 2
            const midLon = (minLon + maxLon) / 2
            const deltaLat = maxLat - minLat
            const deltaLon = maxLon - minLon
            return {
                valid: true,
                latitude: midLat,
                longitude: midLon,
                latitudeDelta: deltaLat < 0.001 ? 0.001 : deltaLat * this.PADDING,
                longitudeDelta: deltaLon < 0.001 ? 0.001 : deltaLon * this.PADDING,
            }
        }
        else
            return {
                valid: false
            }
    }
}