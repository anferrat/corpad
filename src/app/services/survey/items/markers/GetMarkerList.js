export class GetMarkerList {
    constructor(testPointRepo, rectifierRepo, listPresenter, permissions) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.listPresenter = listPresenter
        this.permissions = permissions
    }

    async execute() {
        try { await this.permissions.location() } catch { }
        const [testPoints, rectifiers] = await Promise.all([
            this.testPointRepo.getAllMarkers(),
            this.rectifierRepo.getAllMarkers()
        ])
        return this.listPresenter.execute([...testPoints, ...rectifiers])
    }
}