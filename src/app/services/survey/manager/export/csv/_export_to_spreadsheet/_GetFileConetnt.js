import { ExportFormatTypes } from "../../../../../../../constants/global";

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

    async _getMapLayerFeatures() {
        const mapLayers = await this.mapLayerRepo.getAll()
        return mapLayers.filter(({ visible }) => visible).map(({ data }) => {
            return this._convertData(data).features
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