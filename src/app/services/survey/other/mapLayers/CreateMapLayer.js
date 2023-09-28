import { MapLayer } from "../../../../entities/survey/other/MapLayer"
import { guid } from "../../../../utils/guid"

export class CreateMapLayer {
    constructor(mapLayerRepo) {
        this.mapLayerRepo = mapLayerRepo
    }

    _filterGeoJsonFeatures(data, features) {
        console.log(features)
        return {
            type: data.type,
            features: data.features.filter(({ geometry: { type } }) => ~features.indexOf(type))
        }
    }

    async execute({ name, width, color, data, comment, features, defaultName }) {
        const currentTime = Date.now()
        const newName = name ? name : defaultName
        const mapLayer = new MapLayer(null, guid(), newName, comment, currentTime, currentTime, color, width, color, this._filterGeoJsonFeatures(data, features), true)
        return await this.mapLayerRepo.create(mapLayer)
    }
}