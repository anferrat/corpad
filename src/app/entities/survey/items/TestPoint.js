import { Marker } from "./Marker"
import { ItemStatuses, ItemTypes, TestPointTypes } from "./SurveyItem"

export class TestPoint extends Marker {
    constructor(id, uid, name = null, status = ItemStatuses.UNKNOWN, timeCreated, timeModified, comment = null, location = null, latitude = null, longitude = null, testPointType = TestPointTypes.TEST_STATION) {
        super(id, uid, name, status, timeCreated, timeModified, comment, ItemTypes.TEST_POINT, testPointType, location, latitude, longitude)
        this.testPointType = testPointType
    }
}

