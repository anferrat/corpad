import { ExportFormatTypes } from "../../../../../../../constants/global";

export class _GetFileContent {
    constructor(mapLayerRepo, csvParser, geoParser) {
        this.mapLayerRepo = mapLayerRepo
        this.csvParser = csvParser
        this.geoParser = geoParser
    }

    _convertData(data) {
        try {
            return JSON.parse(data)
        }
        catch (er) {
            console.log(er)
            return {
                type: 'FeatureCollection',
                features: []
            }
        }
    }

    async _getMapLayerFeatures() {
        const mapLayers = await this.mapLayerRepo.getAll()
        return mapLayers.filter(({ visible }) => visible).map(({ data }) => {
            return this._convertData(data).features
        }).flat(1)
    }

    async _exportGeoJson(data, features, includeMapLayers) {
        const mapLayerFeatures = includeMapLayers ? await this._getMapLayerFeatures() : []
        const surveyMarkerFeatures = features
            .map((feature, index) => ({
                ...feature,
                properties: {
                    ...feature.properties,
                    ...data[index]
                }
            }))
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
                return this.geoParser.toKml(geoJson, 'name')
        }
    }
}