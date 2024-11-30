import { ExportFormatTypes } from "../../../../../../../constants/global";
import { MapLayerFillColors, MapLayerStrokeColors } from "../../../../../../../styles/colors";

export class _GetFileContent {
    constructor(mapLayerRepo, csvParser, parseToKml) {
        this.mapLayerRepo = mapLayerRepo
        this.csvParser = csvParser
        this.parseToKml = parseToKml
    }

    _convertData(data) {
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

    _getStyleProperties(type, color, strokeWidth) {
        //Only stroke color is used as a general color property for everything. Polygons filled with stroke color and 0.5 opacity.
        switch (type) {
            case 'Point':
                return {
                    "marker-color": MapLayerStrokeColors[color],
                }
            case 'LineString':
            case 'MultiLineString':
            case 'Polygon':
            case 'MultiPolygon':
                return {
                    "stroke": MapLayerStrokeColors[color],
                    "stroke-width": Number(strokeWidth),
                    "stroke-opacity": 1.0,
                    "fill": MapLayerStrokeColors[color],
                    "fill-opacity": 0.5
                }
            default:
                return {}
        }
    }

    async _getMapLayerFeatures() {
        const mapLayers = await this.mapLayerRepo.getAll()
        return mapLayers.filter(({ visible }) => visible).map(({ data, strokeColor, strokeWidth }) => {
            return this._convertData(data).features.map(feature => {
                const styleProps = this._getStyleProperties(feature.geometry?.type, strokeColor, strokeWidth)
                return ({
                    ...feature,
                    properties: {
                        ...feature.properties,
                        ...styleProps,
                    }
                })
            })
        }).flat(1)
    }

    async _exportGeoJson(data, features, includeMapLayers) {
        const mapLayerFeatures = includeMapLayers ? await this._getMapLayerFeatures() : []
        const surveyMarkerFeatures = features
            .map((feature, index) => {
                const { Name, ...dataProperties } = data[index]
                return ({
                    ...feature,
                    properties: {
                        ...feature.properties,
                        ...dataProperties
                    }
                })
            })
            .filter(({ geometry }) => geometry.coordinates[0] !== null && geometry.coordinates[1] !== null)
        return {
            type: 'FeatureCollection',
            features: [...mapLayerFeatures, ...surveyMarkerFeatures]
        }
    }


    async execute(data, headers, features, includeMapLayers, exportType) {
        switch (exportType) {
            case ExportFormatTypes.CSV:
                return this.csvParser.unparse(data, headers)
            case ExportFormatTypes.KML:
                const geoJson = await this._exportGeoJson(data, features, includeMapLayers)
                return this.parseToKml.execute(geoJson, 'name')
        }
    }
}