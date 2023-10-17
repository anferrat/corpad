import { MapLayer } from "../../../../entities/survey/other/MapLayer"
import { guid } from "../../../../utils/guid"

export class CreateMapLayer {
    constructor(mapLayerRepo, mapLayerPresenter, geoJsonValidation, geoJsonParser, geoJsonPointExtractor, getMapRegionFromBbox) {
        this.mapLayerRepo = mapLayerRepo
        this.mapLayerPresenter = mapLayerPresenter
        this.geoJsonValidation = geoJsonValidation
        this.geoJsonParser = geoJsonParser
        this.geoJsonPointExtractor = geoJsonPointExtractor
        this.getMapRegionFromBbox = getMapRegionFromBbox
    }

    async execute({ name, width, color, data, comment, defaultName }) {
        const geoObject = this.geoJsonParser.parse(data)
        const validGeoObject = this.geoJsonValidation.execute(geoObject)
        const geoString = this.geoJsonParser.unparse(validGeoObject)
        const { geoJson, points, bbox } = this.geoJsonPointExtractor.execute(validGeoObject)
        const currentTime = Date.now()
        const newName = name ? name : defaultName
        const mapLayer = new MapLayer(null, guid(), newName, comment, currentTime, currentTime, color, width, color, geoString, true)
        const created = await this.mapLayerRepo.create(mapLayer)
        const mapRegion = this.getMapRegionFromBbox.execute(bbox)
        return this.mapLayerPresenter.execute(
            created.id,
            created.uid,
            created.name,
            created.comment,
            created.timeCreated,
            created.timeModified,
            created.strokeColor,
            created.strokeWidth,
            created.fillColor,
            created.visible,
            geoJson,
            points,
            mapRegion)
    }
}