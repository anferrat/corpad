import { ItemTypes } from "../../../../constants/global"
import { ExportMarkerSymbols } from "../../../../constants/icons"
import { StatusColors } from "../../../../styles/colors"
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

    getFeature() {
        return {
            "type": "Feature",
            "properties": {
                "name": this.name,
                "marker-size": "large",
                "marker-color": StatusColors[this.status],
                "marker-symbol": this.itemType === ItemTypes.TEST_POINT ? ExportMarkerSymbols[this.itemType][this.testPointType] : ExportMarkerSymbols[this.itemType]
            },
            "geometry": {
                "coordinates": [
                    this.longitude,
                    this.latitude
                ],
                "type": "Point",
            }
        }
    }
}
