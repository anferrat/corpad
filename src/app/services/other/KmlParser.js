import { ItemTypes } from "../../../constants/global"
import { ItemTypeLabels, TestPointTypeLabels } from "../../../constants/labels"

export class KmlParser {
    constructor() {
        this.head = '<?xml version="1.0" encoding="UTF-8"?>\r' +
            '<kml xmlns="http://earth.google.com/kml/2.0"> <Document>\r' +
            '<Style id="danger">\r' +
            '<IconStyle>\r' +
            '<color>ff0000ff</color>\r' +
            '<Icon><href>http://maps.google.com/mapfiles/kml/paddle/red-circle.png</href></Icon>\r' +
            '</IconStyle>\r' +
            '</Style>\r' +
            '<Style id="success">\r' +
            '<IconStyle>\r' +
            '<color>ff00ff00</color>\r' +
            '<Icon><href>http://maps.google.com/mapfiles/kml/paddle/red-circle.png</href></Icon>\r' +
            '</IconStyle>\r' +
            '</Style>\r' +
            '<Style id="warning">\r' +
            '<IconStyle>\r' +
            '<color>ffffff00</color>\r' +
            '<Icon><href>http://maps.google.com/mapfiles/kml/paddle/red-circle.png</href></Icon>\r' +
            '</IconStyle>\r' +
            '</Style>\r' +
            '<Style id="basic">\r' +
            '<IconStyle>\r' +
            '<color>ffd3d3d3</color>\r' +
            '<Icon><href>http://maps.google.com/mapfiles/kml/paddle/red-circle.png</href></Icon>\r' +
            '</IconStyle>\r' +
            '</Style>\r'
        this.end = '</Document> </kml>'
    }

    _genSubtitle(itemType, testPointType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return TestPointTypeLabels[testPointType]
            default:
                return ItemTypeLabels[itemType] ?? 'item'
        }
    }

    _genMarkerDescription(itemType, testPointType) {
        return `${this._genSubtitle(itemType, testPointType)}\r`
    }

    _parseMarker(marker) {
        const { name, status, latitude, longitude, itemType, testPointType } = marker
        const description = this._genMarkerDescription(itemType, testPointType)
        return (
            '<Placemark>\r' +
            '<name>' + (name ?? 'No name') + '</name>\r' +
            '<description>' + description + '</description>\r' +
            '<styleUrl> #' + (status === 0 ? 'success' : status === 1 ? 'warning' : status === 2 ? 'danger' : 'basic') + '</styleUrl>\r' +
            '<Point>\r' +
            '<coordinates>\r' +
            (longitude ?? '0') + ', ' + (latitude ?? '0') + ', 0.' +
            '</coordinates>\r' +
            '</Point>\r' +
            '</Placemark>\r'
        )
    }

    parseMarkers(markers) {
        return `${this.head}${markers.map((marker) => this._parseMarker(marker)).join()}${this.end}`
    }
}
