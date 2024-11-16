import { Platform } from "react-native"
import { ExternalFileTypes } from "../../../../constants/global"

export class ExternalFile {
    constructor(uri, name, fileType, size) {
        this.uri = uri
        this.name = name
        this.fileType = fileType
        this.size = size
    }

    getFileType() {
        if (!this.uri)
            return undefined
        else if (this.uri.endsWith('.json'))
            return ExternalFileTypes.SURVEY
        else if (this.uri.endsWith('.corpad'))
            return ExternalFileTypes.SURVEY_WITH_ASSETS
        else if (this.uri.endsWith('.csv'))
            return ExternalFileTypes.COMMA_SEPARATED_TEXT
        else if (this.uri.endsWith('.jpg') || this.uri.endsWith('.png') || this.uri.endsWith('.webp') || this.uri.endsWith('.jpeg') || this.uri.endsWith('.avif'))
            return ExternalFileTypes.IMAGE
        else if (this.uri.endsWith('.kml'))
            return ExternalFileTypes.KEYHOLE_MARKUP_LANGUAGE
        else if (this.uri.endsWith('.kmz'))
            return ExternalFileTypes.KEYHOLE_MARKUP_ZIPPED
        else if (this.uri.endsWith('.gpx'))
            return ExternalFileTypes.GPS_EXCHANGE_FORMAT
        else if (this.uri.endsWith('.geojson'))
            return ExternalFileTypes.GEOJSON
        else if (this.uri.endsWith('.xlsx'))
            return ExternalFileTypes.XLSX
        else return ExternalFileTypes.UNKNOWN_FILE
    }

    setFileType(fileType) {
        this.fileType = fileType
    }

    getName() {
        if (this.name)
            return this.name
        else {
            const path = decodeURI(this.uri)
            const fileType = this.getFileType()
            if (fileType === ExternalFileTypes.UNKNOWN_FILE)
                return null
            else
                return path.substring(path.lastIndexOf('/') + 1, path.length)
        }
    }

    getPath() {
        return Platform.select({
            android: this.uri,
            ios: decodeURI(this.uri),
            default: decodeURI(this.uri)
        })
    }
}