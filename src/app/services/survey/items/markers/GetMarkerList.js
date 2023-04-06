export class GetMarkerList {
    constructor(testPointRepo, rectifierRepo, listPresenter) {
        this.testPointRepo = testPointRepo
        this.rectifierRepo = rectifierRepo
        this.listPresenter = listPresenter
    }

    async execute() {
        const [testPoints, rectifiers] = await Promise.all([
            this.testPointRepo.getAllMarkers(),
            this.rectifierRepo.getAllMarkers()
        ])
        return this.listPresenter.execute([...testPoints, ...rectifiers])
    }
}