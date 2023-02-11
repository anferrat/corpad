export class SearchMarker {
    constructor (markerRepo) {
        this.markerRepo = markerRepo
    }

    execute(keyword) {
        const SEARCH_REULT_LIMIT = 20
        return this.markerRepo.serach(keyword, SEARCH_REULT_LIMIT)
    }
}