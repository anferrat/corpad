export class GetDeclination {
    constructor(geolocationRepo) {
        this.geolocationRepo = geolocationRepo
    }

    execute(latitude, longitude) {
        return {
            declination: this.geolocationRepo.getDeclination(latitude, longitude)
        }
    }
}