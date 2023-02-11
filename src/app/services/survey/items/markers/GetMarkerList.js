export class GetMarkerList {
    constructor(markerRepo) {
        this.markerRepo = markerRepo
    }

    execute() {
        return this.markerRepo.getAll()
    }
}