export class GetMarkerList {
    constructor(testPointRepo, rectifierRepo, listPresenter, permissions) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.listPresenter = listPresenter
        this.permissions = permissions
    }

    async execute(filters) {
        try { await this.permissions.location() } catch { }
        const [testPoints, rectifiers] = await Promise.all([
            this.testPointRepo.getAllMarkers(filters),
            this.rectifierRepo.getAllMarkers(filters)
        ])
        return this.listPresenter.execute([...testPoints, ...rectifiers])
    }
}