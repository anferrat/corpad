export class GetCurrentPosition {
    constructor(geolocationRepo, permissions) {
        this.geolocationRepo = geolocationRepo
        this.permissions = permissions
    }

    async execute() {
        await this.permissions.location()
        return await this.geolocationRepo.getCurrent()
    }
}