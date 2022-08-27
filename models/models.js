//Unfinished working on it to unify all data into classes and use them instead of objects

class SurveyElement {
    constructor(
        uid,
        name,
        timeCreated,
        timeModified) {
        this.uid = uid
        this.name = name
        this.timeCreated = timeCreated
        this.timeModified = timeModified
    }
}

class SurveyItem extends SurveyElement {
    constructor(
        uid,
        name,
        timeCreated,
        timeModified,
        comment) {
        super(uid, name, timeCreated, timeModified)
        this.comment = comment
    }
}

class SurveyItemMarker extends SurveyItem {
    constructor(
        uid,
        name,
        timeCreated,
        timeModified,
        comment,
        status,
        latitude,
        longitude,
        location) {
        super(uid, name, timeCreated, timeModified, comment)
        this.status = status
        this.location = location
        this.latitude = latitude
        this.longitude = longitude
    }
}

class TestPoint extends SurveyItemMarker {
    constructor(
        uid,
        name,
        timeCreated,
        timeModified,
        comment,
        status,
        latitude,
        longitude,
        location,
        testPointType) {
        super(uid, name, timeCreated, timeModified, comment, status, latitude, longitude, location)
        this.testPointType = testPointType
    }
}

class Rectifier extends SurveyItemMarker {
    constructor(uid,
        name,
        timeCreated,
        timeModified,
        comment,
        status,
        latitude,
        longitude,
        location,
        model,
        serialNumber,
        powerSource,
        acVoltage,
        acCurrent,
        tapSetting,
        tapValue,
        tapCoarse,
        tapFine,
        maxVoltage,
        maxCurrent) {
        super(uid, name, timeCreated, timeModified, comment, status, latitude, longitude, location)
        this.model = model
        this.serialNumber = serialNumber
        this.powerSource = powerSource
        this.acVoltage = acVoltage
        this.acCurrent = acCurrent
        this.tapSetting = tapSetting
        this.tapValue = tapValue
        this.tapCoarse = tapCoarse
        this.tapFine = tapFine
        this.maxVoltage = maxVoltage
        this.maxCurrent = maxCurrent
    }
}
