
import { ItemStatuses } from "../../../../constants/global"

export class SurveyFile {
    constructor(fileName, isCloud, hash, filePath, cloudId, timeModified, surveyObject) {
        this.fileName = fileName
        this.timeModified = timeModified
        this.isCloud = isCloud
        this.hash = hash
        this.filePath = filePath
        this.cloudId = cloudId
        this.surveyObject = surveyObject
        this.version
        this.name
        this.tpCount
        this.rectifierCount
        this.pipelineCount
        this.good
        this.uid
        this.assetCount
    }

    getMetaData() {
        const { version } = this.surveyObject
        const { name, tpCount, rectifierCount, pipelineCount, good, uid, assetCount } = this._getMetaDataByVersion(version, this.surveyObject.data)
        this.name = name
        this.version = version
        this.tpCount = tpCount
        this.rectifierCount = rectifierCount
        this.pipelineCount = pipelineCount
        this.good = good
        this.uid = uid
        this.assetCount = assetCount
    }

    _getMetaDataByVersion(version, data) {
        switch (version) {
            case 1:
                return {
                    name: data.survey[0][1],
                    tpCount: data.testPoints.length,
                    rectifierCount: data.rectifiers.length,
                    pipelineCount: data.pipelines.length,
                    good: this._getGoodItemCount(data.testPoints, data.rectifiers, 8, 7),
                    uid: data.survey[0][0],
                    assetCount: null
                }
            case 2:
                return {
                    name: data.survey[1],
                    tpCount: data.testPoints.length,
                    rectifierCount: data.rectifiers.length,
                    pipelineCount: data.pipelines.length,
                    good: this._getGoodItemCount(data.testPoints, data.rectifiers, 7, 3),
                    uid: data.survey[0],
                    assetCount: data.assets.length
                }
        }
    }


    _getGoodItemCount(testPoints, rectifiers, testPointTstatusIndex, rectifierStatusIndex) {
        return testPoints.filter(tp => (tp[testPointTstatusIndex] ?? -1) === ItemStatuses.GOOD).length +
            rectifiers.filter(rt => (rt[rectifierStatusIndex] ?? -1) === ItemStatuses.GOOD).length
    }
}