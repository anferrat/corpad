import { MapLayer } from "../../../../entities/survey/other/MapLayer"

export class UpdateMapLayer {
    constructor(mapLayerRepo) {
        this.mapLayerRepo = mapLayerRepo
    }

    async execute({ id, name, comment, color, width, visible, defaultName }) {
        const currentTime = Date.now()
        const newName = name ? name : defaultName
        const mapLayer = new MapLayer(id, null, newName, comment, null, currentTime, color, width, color, null, visible)
        return await this.mapLayerRepo.update(mapLayer)
    }
}