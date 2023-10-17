export class GetMapLayerData {
    constructor(mapLayerRepo, mapLayerPresenter, geoJsonParser, geoJsonPointExtractor) {
        this.mapLayerRepo = mapLayerRepo
        this.mapLayerPresenter = mapLayerPresenter
        this.geoJsonParser = geoJsonParser
        this.geoJsonPointExtractor = geoJsonPointExtractor
    }


    async execute(layerId) {
        const { id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, visible, data } = await this.mapLayerRepo.getById(layerId)
        const geoObject = this.geoJsonParser.parse(data)
        const { geoJson, points } = this.geoJsonPointExtractor.execute(geoObject)
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
            points)
    }
}