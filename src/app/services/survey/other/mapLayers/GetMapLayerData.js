export class GetMapLayerData {
    constructor(mapLayerRepo) {
        this.mapLayerRepo = mapLayerRepo
    }

    async execute(layerId) {
        return await this.mapLayerRepo.getById(layerId)
    }
}