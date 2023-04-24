export class WatchPosition {
    constructor(geolocationRepo) {
        this.geolocationRepo = geolocationRepo
    }

    async execute(callback) {
        const permission = await this.geolocationRepo.getPermission()
        const watchId = this.geolocationRepo.watch(permission === 'granted', callback)
        return () => this.geolocationRepo.clear(watchId)
    }
}