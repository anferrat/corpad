export class GetMapLayerList {
    constructor(mapLayerRepo, mapLayerPresenter) {
        this.mapLayerRepo = mapLayerRepo
        this.mapLayerPresenter = mapLayerPresenter
    }

    async execute() {
        const layers = await this.mapLayerRepo.getAll()
        return layers.map(layer => this.mapLayerPresenter.execute(layer))
    }
}