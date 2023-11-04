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

    _check(val) {
        return (val || val === 0) && val !== Infinity && val !== -Infinity
    }

    execute(bbox) {
        const [minLon, minLat, maxLon, maxLat] = bbox
        if (this._check(maxLat) && this._check(minLat) && this._check(maxLon) && this._check(minLon)) {
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