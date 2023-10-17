export class GeoJsonParser {
    constructor() {
    }

    parse(string) {
        try {
            return JSON.parse(string)
        }
        catch (er) {
            return {
                type: 'FeatureCollection',
                features: []
            }
        }
    }

    unparse(object) {
        try {
            return JSON.stringify(object)
        }
        catch (er) {
            return JSON.stringify({
                type: 'FeatureCollection',
                features: []
            })
        }
    }
}

