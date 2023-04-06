export class GeolocationCalculator {
    constructor() {
        this.PiOver180 = Math.PI / 180
        this.R = 6371e3
    }

    _getMax(a, b) {
        return a !== null && b !== null ? Math.max(a, b) : (a === null ? b : a)
    }

    _getMin(a, b) {
        return a !== null && b !== null ? Math.min(a, b) : (a === null ? b : a)
    }

    calculateRegionCorners(markers) {
        return ({
            minLat: markers.reduce((min, { latitude }) => this._getMin(latitude, min), markers[0]?.latitude ?? null),
            minLon: markers.reduce((min, { longitude }) => this._getMin(longitude, min), markers[0]?.longitude ?? null),
            maxLat: markers.reduce((max, { latitude }) => this._getMax(latitude, max), markers[0]?.latitude ?? null),
            maxLon: markers.reduce((max, { longitude }) => this._getMax(longitude, max), markers[0]?.longitude ?? null),
        })
    }

    haversine(lat1, lon1, lat2, lon2) {
        const fi1 = lat1 * this.PiOver180
        const fi2 = lat2 * this.PiOver180
        const deltaL = (lon2 - lon1) * this.PiOver180
        const b = Math.atan2(deltaL * Math.cos(fi2), Math.cos(fi1) * Math.sin(fi2) - Math.sin(fi1) * Math.cos(fi2) * Math.cos(deltaL))
        const d = Math.acos(Math.sin(fi1) * Math.sin(fi2) + Math.cos(fi1) * Math.cos(fi2) * Math.cos(deltaL)) * this.R
        return { distance: d, heading: b }
    }
}