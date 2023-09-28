import { FileMimeTypes } from "../../../constants/global"
import { DOMParser } from "@xmldom/xmldom"
import { Error, errors } from "../../utils/Error"


export class GeoParser {
    constructor() {
        this.tj = require('@tmcw/togeojson')
    }

    toGeoJson(content, mimeType) {
        switch (mimeType) {
            case FileMimeTypes.KML:
                const kml = new DOMParser().parseFromString(content, FileMimeTypes.KML)
                return this.tj.kml(kml)
            default:
                throw new Error(errors.GENERAL, 'Unable to parse file content', 'mimeType is not supported')
        }
    }
}