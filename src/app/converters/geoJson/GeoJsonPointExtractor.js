/*
Extracts point features from geoJson and returns updated geoJson and array of points.

*/

import { MapLayerPoint } from "../../entities/survey/other/MapLayerPoint"

export class GeoJsonPointExtractor {
    constructor() {
    }

    _convertGeometryCollections(geoJson) {

    }

    execute(geoJson) {
        const { features } = geoJson
        const newFeatures = []
        const points = []
        for (i = 0; i < features.length; i++) {
            const { geometry, properties } = features[i]
            //Extracts points in order to create tapable markers
            if (geometry.type === 'Point') {
                const name = properties.name ?? `Point ${points.length + 1}`
                const point = new MapLayerPoint(name, geometry.coordinates[1], geometry.coordinates[0], properties)
                points.push(point)
            }
            //Unfolds Geometry collection overlay, since its not supported by rn-maps (1 layer only)
            else if (geometry.type === 'GeometryCollection') {
                geometry.geometries.forEach(({ type, coordinates }) => {
                    newFeatures.push({ type: 'Feature', properties, geometry: { type, coordinates } })
                })
            }
            else
                newFeatures.push(features[i])
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