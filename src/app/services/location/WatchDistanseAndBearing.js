export class WatchDistanseAndBearing {
    constructor(geolocationRepo, geolocationCalculator) {
        this.geolocationRepo = geolocationRepo
        this.geolocationCalculator = geolocationCalculator
    }

    execute(callback, pointLatitude, pointLongitude) {
        const remove = this.geolocationRepo.watch(({ latitude, longitude, accuracy }) =>
            callback({
                ...this.geolocationCalculator.haversine(pointLatitude, pointLongitude, latitude, longitude),
                accuracy: accuracy,
                latitude,
                longitude,
                declination: this.geolocationRepo.getDeclination(latitude, longitude)
            }))
        return { remove }
    }
}