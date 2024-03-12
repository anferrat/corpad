
export class SurveyFile {
    constructor(uid, filename, isCloud, hash, path, cloudId, timeModified, name, tpCount, plCount, rtCount, successRate, assetCount) {
        this.filename = filename
        this.timeModified = timeModified
        this.isCloud = isCloud
        this.hash = hash
        this.path = path
        this.cloudId = cloudId
        this.name = name
        this.tpCount = tpCount
        this.rtCount = rtCount
        this.plCount = plCount
        this.successRate = successRate
        this.uid = uid
        this.assetCount = assetCount
    }
}