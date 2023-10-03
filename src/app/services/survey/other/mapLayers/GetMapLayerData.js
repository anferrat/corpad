export class GetMapLayerData {
    constructor(mapLayerRepo, mapLayerPresenter) {
        this.mapLayerRepo = mapLayerRepo
        this.mapLayerPresenter = mapLayerPresenter
    }


    async execute(layerId) {
        return this.mapLayerPresenter.execute(await this.mapLayerRepo.getById(layerId))
    }
}