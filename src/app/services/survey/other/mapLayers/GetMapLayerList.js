export class GetMapLayerList {
    constructor(mapLayerRepo, mapLayerPresenter, geoJsonValidaton, geoJsonParser, geoJsonPointExtractor) {
        this.mapLayerRepo = mapLayerRepo
        this.mapLayerPresenter = mapLayerPresenter
        this.geoJsonValidaton = geoJsonValidaton
        this.geoJsonParser = geoJsonParser
        this.geoJsonPointExtractor = geoJsonPointExtractor
    }

    async execute() {
        const layers = await this.mapLayerRepo.getAll()
        const data = layers.map((layer) => {
            const { geoJson, points } = this.geoJsonPointExtractor.execute(this.geoJsonValidaton.execute(this.geoJsonParser.parse(layer.data)))
            return ({
                geoJson,
                points
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
                data[index].points))
    }
}