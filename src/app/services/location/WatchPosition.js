export class WatchPosition {
    constructor(geolocationRepo) {
        this.geolocationRepo = geolocationRepo
    }

    _convertCoordinate(float) {
        return Number(float.toFixed(7))
    }

    _convertAccuracy(float) {
        return Math.floor(float)
    }

    addListener(callback) {
        return this.geolocationRepo.watch(({ latitude, longitude, accuracy }) => callback({
            latitude: this._convertCoordinate(latitude),
            longitude: this._convertCoordinate(longitude),
            accuracy: this._convertAccuracy(accuracy)
        }))
    }
}