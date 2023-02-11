import { SurveyItem } from "./SurveyItem"

export class Marker extends SurveyItem {
    constructor(id, uid, name, status, timeCreated, timeModified, comment, itemType, testPointType, location, latitude, longitude) {
        super(id, uid, name, status, timeCreated, timeModified, comment, itemType, testPointType)
        this.location = location
        this.latitude = latitude
        this.longitude = longitude
    }

    getMarker() {
        return this
    }
}
