export class WatchPosition {
    constructor(geolocationRepo) {
        this.geolocationRepo = geolocationRepo
    }

    addListener(callback) {
        return this.geolocationRepo.watch(callback)
    }
}