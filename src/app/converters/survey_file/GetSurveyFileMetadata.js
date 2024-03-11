import { Error, errors } from "../../utils/Error"
import { ItemStatuses } from "../../../constants/global"

export class GetSurveyFileMetadata {
    constructor() {
    }

    _getGoodItemCount(testPoints, rectifiers, testPointTstatusIndex, rectifierStatusIndex) {
        return testPoints.filter(tp => (tp[testPointTstatusIndex] ?? -1) === ItemStatuses.GOOD).length +
            rectifiers.filter(rt => (rt[rectifierStatusIndex] ?? -1) === ItemStatuses.GOOD).length
    }

    execute(surveyObject) {
        try {
            const { version, data } = surveyObject
            switch (version) {
                case 1:
                    return {
                        name: data.survey[0][1],
                        tpCount: data.testPoints.length,
                        rectifierCount: data.rectifiers.length,
                        pipelineCount: data.pipelines.length,
                        good: this._getGoodItemCount(data.testPoints, data.rectifiers, 8, 7),
                        uid: data.survey[0][0],
                        assetCount: 0
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
        catch (er) {
            throw new Error(errors.GENERAL, 'Unable to get survey file metadata', er)
        }
    }
}