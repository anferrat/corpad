import { labels } from "../../../constants/constants" //hmmm what is the best way to have this here, maybe constants are global after all
import { ItemTypes } from "../../entities/survey/items/SurveyItem"

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

    _genSubtitle(itemType, markerType) {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return labels[markerType].label
            default:
                return labels[itemType].label
        }
    }

    _genMarkerDescription(location, comment, itemType, markerType) {
        return `${this._genSubtitle(itemType, markerType)}\r`
    }

    _parseMarker(marker) {
        const { name, markerType, status, latitude, longitude, itemType, location, comment } = marker
        const description = this._genMarkerDescription(location, comment, itemType, markerType)
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
