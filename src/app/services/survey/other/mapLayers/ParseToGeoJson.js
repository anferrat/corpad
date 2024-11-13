import { ExternalFileTypes, FileMimeTypes } from "../../../../../constants/global"
import { DOMParser } from "@xmldom/xmldom"
import { Error, errors } from "../../../../utils/Error"


export class ParseToGeoJson {
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

    execute(content, fileType) {
        switch (fileType) {
            case ExternalFileTypes.KEYHOLE_MARKUP_LANGUAGE:
            case ExternalFileTypes.KEYHOLE_MARKUP_ZIPPED:
                const kml = new DOMParser().parseFromString(content, FileMimeTypes.KML)
                return this._formatCheck(this.tj.kml(kml))
            case ExternalFileTypes.GPS_EXCHANGE_FORMAT:
                const gpx = new DOMParser().parseFromString(content, FileMimeTypes.GPX)
                return this._formatCheck(this.tj.gpx(gpx))
            default:
                throw new Error(errors.GENERAL, 'Unable to parse file content', 'FileType is not supported')
        }
    }


}