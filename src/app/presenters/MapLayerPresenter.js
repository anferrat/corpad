export class MapLayerPresenter {
    constructor(geoJsonPointExtractor) {
        this.geoJsonPointExtractor = geoJsonPointExtractor
    }

    _parseData(data) {
        try {
            return JSON.parse(data)
        }
        catch (er) {
            return {
                type: 'FeatureCollection',
                features: []
            }
        }
    }

    execute(layer) {
        const data = this._parseData(layer.data)
        const { geoJson, points } = this.geoJsonPointExtractor.execute(data)
        return {
            ...layer,
            data: geoJson,
            points,
            featureCount: data["features"].length
        }
    }
}