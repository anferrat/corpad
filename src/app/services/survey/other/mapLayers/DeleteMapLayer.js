export class DeleteMapLayer {
    constructor(mapLayerRepo) {
        this.mapLayerRepo = mapLayerRepo
    }
    async execute(layerId) {
        return await this.mapLayerRepo.delete(layerId)
    }
}