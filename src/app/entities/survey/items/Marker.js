import { ItemTypes } from "../../../../constants/global"
import { basic, StatusColors } from "../../../../styles/colors"
import { SurveyItem } from "./SurveyItem"

export class Marker extends SurveyItem {
    constructor(id, uid, name, status, timeCreated, timeModified, comment, itemType, testPointType, location, latitude, longitude) {
        super(id, uid, name, status, timeCreated, timeModified, comment, itemType, testPointType)
        this.location = location
        this.latitude = latitude
        this.longitude = longitude
        this.testPointType = testPointType
    }

    getMarker() {
        return this
    }

    updateCoordinates({ latitude, longitude, timeModified }) {
        this.latitude = latitude
        this.longitude = longitude
        this.timeModified = timeModified
    }

    getFeature() {
        return {
            "type": "Feature",
            "properties": {
                "Name": this.name ?? 'Point',
                "marker-color": StatusColors[this.status] ?? basic,
                "marker-symbol": this.itemType === ItemTypes.TEST_POINT ? 't' : 'r'
            },
            "geometry": {
                "coordinates": [
                    this.longitude ?? 0,
                    this.latitude ?? 0
                ],
                "type": "Point",
            }
        }
    }
}
