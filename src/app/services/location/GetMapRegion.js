export class GetMapRegion {
    constructor(geolocationRepo, geolocationCalculator, permissions) {
        this.geolocationRepo = geolocationRepo
        this.geolocationCalculator = geolocationCalculator
        this.permissions = permissions
        this.DEFAULT_REGION = {
            latitude: 38.910594121910854,
            latitudeDelta: 69.4862269475757,
            longitude: -101.67061429470778,
            longitudeDelta: 58.88461388647556
        }
    }


    _getRegionFromPosition({ latitude, longitude }) {
        return {
            latitudeDelta: 0.25,
            longitude: longitude,
            longitudeDelta: 0.25,
            latitude: latitude
        }
    }

    _getRegionFromCorners({ minLat, minLon, maxLat, maxLon }) {
        const PADDING = 1.1 // adds extra distance 
        if (maxLat !== null && minLat !== null && maxLon !== null && minLon !== null) {
            const midLat = (minLat + maxLat) / 2
            const midLon = (minLon + maxLon) / 2
            const deltaLat = maxLat - minLat
            const deltaLon = maxLon - minLon
            return {
                latitude: midLat,
                longitude: midLon,
                latitudeDelta: deltaLat < 0.001 ? 0.001 : deltaLat * PADDING,
                longitudeDelta: deltaLon < 0.001 ? 0.001 : deltaLon * PADDING,
            }
        }
        else return undefined
    }

    async execute(markers) {
        try {

            const corners = this.geolocationCalculator.calculateRegionCorners(markers)
            const initialRegion = this._getRegionFromCorners(corners)

            if (initialRegion)
                return initialRegion
            else {
                await this.permissions.location()
                return this._getRegionFromPosition(await this.geolocationRepo.getCurrent(permission === 'granted'))
            }
        }
        catch {
            return this.DEFAULT_REGION
        }
    }


}