//function to generate simple KML file with Placemarks, takes array of Marker objects, returns string
import { subtitleHandlerItem } from "./functions"

const head = '<?xml version="1.0" encoding="UTF-8"?>\r' +
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

const end = '</Document> </kml>'

const genPlacemark = (marker) => {
    return (
        '<Placemark>\r' +
        '<name>' + (marker.name ?? 'No name') + '</name>\r' +
        '<description>' + (subtitleHandlerItem(marker.dataType, marker.testPointType)) + '</description>\r' +
        '<styleUrl> #' + (marker.status === 0 ? 'success' : marker.status === 1 ? 'warning' : marker.status === 2 ? 'danger' : 'basic') + '</styleUrl>\r' +
        '<Point>\r' +
        '<coordinates>\r' +
        (marker.longitude ?? '0') + ', ' + (marker.latitude ?? '0') + ', 0.' +
        '</coordinates>\r' +
        '</Point>\r' +
        '</Placemark>\r'
    )
}

export const genKml = (data) => head + data.map(marker => genPlacemark(marker)).join() + end