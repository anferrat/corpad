export class GetMarkerList {
    constructor(testPointRepo, rectifierRepo, listPresenter, permissions) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.listPresenter = listPresenter
        this.permissions = permissions
    }

    async execute(filters) {
        try { await this.permissions.location() } catch (er) {} // its here to enable userposition on the map, not a bad idea to extract to separate service
        const [testPoints, rectifiers] = await Promise.all([
            this.testPointRepo.getAllMarkers(filters),
            this.rectifierRepo.getAllMarkers(filters)
        ])
        return this.listPresenter.execute([...testPoints, ...rectifiers])
    }
}