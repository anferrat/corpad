export class GetMapLayerData {
    constructor(mapLayerRepo, mapLayerPresenter, geoJsonParser, geoJsonPointExtractor, getMapRegionFromBbox) {
        this.mapLayerRepo = mapLayerRepo
        this.mapLayerPresenter = mapLayerPresenter
        this.geoJsonParser = geoJsonParser
        this.geoJsonPointExtractor = geoJsonPointExtractor
        this.getMapRegionFromBbox = getMapRegionFromBbox
    }


    async execute(layerId) {
        const { id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, visible, data } = await this.mapLayerRepo.getById(layerId)
        const geoObject = this.geoJsonParser.parse(data)
        const { geoJson, points, bbox } = this.geoJsonPointExtractor.execute(geoObject)
        const mapRegion = this.getMapRegionFromBbox.execute(bbox)
        return this.mapLayerPresenter.execute(
            id,
            uid,
            name,
            comment,
            timeCreated,
            timeModified,
            strokeColor,
            strokeWidth,
            fillColor,
            visible,
            geoJson,
            points,
            mapRegion
        )
    }
}