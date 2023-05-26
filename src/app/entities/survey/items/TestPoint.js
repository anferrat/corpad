import { Marker } from "./Marker"
import { ItemStatuses, ItemTypes } from "./../../../../constants/global"

export class TestPoint extends Marker {
    constructor(
        id,
        uid,
        name,
        status,
        timeCreated,
        timeModified,
        comment,
        location,
        latitude,
        longitude,
        testPointType) {
        super(id, uid, name, status, timeCreated, timeModified, comment, ItemTypes.TEST_POINT, testPointType, location, latitude, longitude)
        this.testPointType = testPointType
    }

    reset() {
        this.status = ItemStatuses.UNKNOWN
        this.timeModified = Date.now()
    }
}

