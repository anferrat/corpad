export class WatchDistanseAndBearing {
    constructor(geolocationRepo, geolocationCalculator) {
        this.geolocationRepo = geolocationRepo
        this.geolocationCalculator = geolocationCalculator
    }

    execute(callback, pointLatitude, pointLongitude) {
        const watchId = this.geolocationRepo.watch(true, ({ latitude, longitude, accuracy }) =>
            callback({
                ...this.geolocationCalculator.haversine(pointLatitude, pointLongitude, latitude, longitude),
                accuracy: accuracy,
                latitude,
                longitude,
                declination: this.geolocationRepo.getDeclination(latitude, longitude)
            }))
        return {
            remove: () => this.geolocationRepo.clear(watchId)
        }
    }
}