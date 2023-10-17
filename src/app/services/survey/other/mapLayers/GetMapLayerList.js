export class GetMapLayerList {
    constructor(mapLayerRepo, mapLayerPresenter, geoJsonValidaton, geoJsonParser, geoJsonPointExtractor, getMapRegionFromBbox) {
        this.mapLayerRepo = mapLayerRepo
        this.mapLayerPresenter = mapLayerPresenter
        this.geoJsonValidaton = geoJsonValidaton
        this.geoJsonParser = geoJsonParser
        this.geoJsonPointExtractor = geoJsonPointExtractor
        this.getMapRegionFromBbox = getMapRegionFromBbox
    }

    async execute() {
        const layers = await this.mapLayerRepo.getAll()
        const data = layers.map((layer) => {
            const { geoJson, points, bbox } = this.geoJsonPointExtractor.execute(this.geoJsonValidaton.execute(this.geoJsonParser.parse(layer.data)))
            const mapRegion = this.getMapRegionFromBbox.execute(bbox)
            return ({
                geoJson,
                points,
                mapRegion
            })
        })
        return layers.map(({ id, uid, name, comment, timeCreated, timeModified, strokeColor, strokeWidth, fillColor, visible }, index) =>
            this.mapLayerPresenter.execute(
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
                data[index].geoJson,
                data[index].points,
                data[index].mapRegion))
    }
}