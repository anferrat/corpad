export class ClearWatch {
    constructor(geolocationRepo) {
        this.geolocationRepo = geolocationRepo
    }

    execute(watchId) {
        this.geolocationRepo.clear(watchId)
    }
}