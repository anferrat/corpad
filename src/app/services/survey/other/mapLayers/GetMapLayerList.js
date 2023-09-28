export class GetMapLayerList {
    constructor(mapLayerRepo) {
        this.mapLayerRepo = mapLayerRepo
    }

    async execute() {
        const layers = await this.mapLayerRepo.getAll()
        return layers
    }
}