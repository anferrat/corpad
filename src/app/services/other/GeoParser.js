import { ExternalFileTypes, FileMimeTypes } from "../../../constants/global"
import { DOMParser } from "@xmldom/xmldom"
import { Error, errors } from "../../utils/Error"


export class GeoParser {
    constructor() {
        this.tj = require('@tmcw/togeojson')
        this.toKmlConverter = require('tokml')
    }

    _formatCheck(data) {
        return {
            type: 'FeatureCollection',
            features: data.features.filter(({ geometry }) =>
                geometry && geometry.type && ['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon', 'GeometryCollection'].includes(geometry.type)
            )
        }
    }

    toGeoJson(content, fileType) {
        switch (fileType) {
            case ExternalFileTypes.KEYHOLE_MARKUP_LANGUAGE:
                const kml = new DOMParser().parseFromString(content, FileMimeTypes.KML)
                return this._formatCheck(this.tj.kml(kml))
            case ExternalFileTypes.GPS_EXCHANGE_FORMAT:
                const gpx = new DOMParser().parseFromString(content, FileMimeTypes.GPX)
                return this._formatCheck(this.tj.gpx(gpx))
            default:
                throw new Error(errors.GENERAL, 'Unable to parse file content', 'FileType is not supported')
        }
    }

    toKml(geoJson, nameProperty) {
        try {
            return this.toKmlConverter(geoJson, {
                name: nameProperty,
                simplestyle: true
            })
        }
        catch (er) {
            throw new Error(errors.GENERAL, 'Unable to convert file to KML', er)
        }
    }


}