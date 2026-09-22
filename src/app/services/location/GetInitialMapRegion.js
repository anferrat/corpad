export class GetInitialMapRegion {
    constructor(geolocationRepo, geolocationCalculator, permissions, getMapRegionFromBbox) {
        this.geolocationRepo = geolocationRepo
        this.geolocationCalculator = geolocationCalculator
        this.permissions = permissions
        this.getMapRegionFromBbox = getMapRegionFromBbox
        this.DEFAULT_REGION = {
            latitude: 38.910594121910854,
            latitudeDelta: 69.4862269475757,
            longitude: -101.67061429470778,
            longitudeDelta: 58.88461388647556
        }
    }

    async execute(markers) {
        try {
            const bbox = this.geolocationCalculator.calculateMarkersBbox(markers)
            const [minLon, minLat, maxLon, maxLat] = bbox
            const valid = [minLon, minLat, maxLon, maxLat].every(Number.isFinite)
            if (valid) {
                const mapRegion = this.getMapRegionFromBbox.execute(bbox)
                if (mapRegion.valid)
                    return mapRegion
            }

            await this.permissions.location()
            const { latitude, longitude } = await this.geolocationRepo.getCurrent()
            if (Number.isFinite(latitude) && Number.isFinite(longitude))
                return {
                    latitudeDelta: 0.25,
                    longitude: longitude,
                    longitudeDelta: 0.25,
                    latitude: latitude
                }
            return this.DEFAULT_REGION
        }
        catch (er) {
            return this.DEFAULT_REGION
        }
    }


}
