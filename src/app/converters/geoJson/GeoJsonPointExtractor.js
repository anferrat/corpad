/*
Extracts point features from geoJson and returns updated geoJson and array of points.

*/

import { MapLayerPoint } from "../../entities/survey/other/MapLayerPoint"

export class GeoJsonPointExtractor {
    constructor() {
    }

    execute(geoJson) {
        const { type, features } = geoJson
        if (type !== 'FeatureCollection' || !features)
            return {
                geoJson,
                points: []
            }
        else {
            const newFeatures = []
            const points = []
            for (i = 0; i < features.length; i++) {
                const { geometry, properties } = features[i]
                if (geometry.type !== 'Point')
                    newFeatures.push(features[i])
                else {
                    const name = properties.name ?? `Point ${points.length + 1}`
                    const point = new MapLayerPoint(name, geometry.coordinates[1], geometry.coordinates[0], properties)
                    points.push(point)
                }
            }
            return {
                geoJson: {
                    type: 'FeatureCollection',
                    features: newFeatures
                },
                points,
            }
        }
    }
}