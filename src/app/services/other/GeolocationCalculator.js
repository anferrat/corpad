import bbox from '@turf/bbox'

export class GeolocationCalculator {
    constructor() {
        this.PiOver180 = Math.PI / 180
        this.R = 6371e3
    }

    calculateMarkersBbox(markers) {
        const features = markers
            .filter(({ latitude, longitude }) => Number.isFinite(latitude) && Number.isFinite(longitude))
            .map(({ latitude, longitude }) => ({
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            }))

        if (features.length === 0)
            return [null, null, null, null]

        return bbox({
            type: 'FeatureCollection',
            features
        })
    }

    haversine(lat1, lon1, lat2, lon2) {
        const fi1 = lat1 * this.PiOver180
        const fi2 = lat2 * this.PiOver180
        const deltaL = (lon2 - lon1) * this.PiOver180
        const b = (Math.atan2(deltaL * Math.cos(fi2), Math.cos(fi1) * Math.sin(fi2) - Math.sin(fi1) * Math.cos(fi2) * Math.cos(deltaL)) * 180) / Math.PI
        const d = Math.acos(Math.sin(fi1) * Math.sin(fi2) + Math.cos(fi1) * Math.cos(fi2) * Math.cos(deltaL)) * this.R
        return { distance: d, bearing: (b + 180) % 360 }
    }
}
