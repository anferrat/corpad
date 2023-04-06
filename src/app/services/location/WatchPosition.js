export class WatchPosition {
    constructor(geolocationRepo) {
        this.geolocationRepo = geolocationRepo
    }

    async execute(callback) {
        const permission = await this.geolocationRepo.getPermission()
        return this.geolocationRepo.watch(permission === 'granted', callback)
    }
}