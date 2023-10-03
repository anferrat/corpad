export class MapLayerPresenter {
    constructor() { }

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
        return {
            ...layer,
            data,
            featureCount: data["features"].length
        }
    }
}