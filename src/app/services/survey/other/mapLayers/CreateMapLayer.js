import { MapLayer } from "../../../../entities/survey/other/MapLayer"
import { guid } from "../../../../utils/guid"

export class CreateMapLayer {
    constructor(mapLayerRepo, mapLayerPresenter) {
        this.mapLayerRepo = mapLayerRepo
        this.mapLayerPresenter = mapLayerPresenter
    }

    async execute({ name, width, color, data, comment, defaultName }) {
        console.log(typeof data)
        const currentTime = Date.now()
        const newName = name ? name : defaultName
        const mapLayer = new MapLayer(null, guid(), newName, comment, currentTime, currentTime, color, width, color, JSON.stringify(data), true)
        return this.mapLayerPresenter.execute(await this.mapLayerRepo.create(mapLayer))
    }
}