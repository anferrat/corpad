import { FileMimeTypes } from "../../../constants/global"
import { DOMParser } from "@xmldom/xmldom"
import { Error, errors } from "../../utils/Error"


export class GeoParser {
    constructor() {
        this.tj = require('@tmcw/togeojson')
    }

    _formatCheck(data) {
        return {
            type: 'FeatureCollection',
            features: data.features.filter(({ geometry }) =>
                geometry && geometry.type && ['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon', 'GeometryCollection'].includes(geometry.type)
            )
        }
    }

    toGeoJson(content, mimeType) {
        switch (mimeType) {
            case FileMimeTypes.KML:
                const kml = new DOMParser().parseFromString(content, FileMimeTypes.KML)
                return this._formatCheck(this.tj.kml(kml))
            default:
                throw new Error(errors.GENERAL, 'Unable to parse file content', 'mimeType is not supported')
        }
    }
}