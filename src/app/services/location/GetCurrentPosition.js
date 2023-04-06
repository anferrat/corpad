export class GetCurrentPosition {
    constructor(geolocationRepo) {
        this.geolocationRepo = geolocationRepo
    }

    async execute() {
        const permission = await this.geolocationRepo.getPermission()
        return this.geolocationRepo.getCurrent(permission === 'granted')
    }
}