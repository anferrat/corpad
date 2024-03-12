import { Error, errors } from "../../utils/Error"
import { ItemStatuses } from "../../../constants/global"

export class GetSurveyFileMetadata {
    constructor() {
    }

    _getGoodItemCount(testPoints, rectifiers, testPointTstatusIndex, rectifierStatusIndex) {
        const total = testPoints.length + rectifiers.length
        const passed = testPoints.filter(tp => (tp[testPointTstatusIndex] ?? -1) === ItemStatuses.GOOD).length +
            rectifiers.filter(rt => (rt[rectifierStatusIndex] ?? -1) === ItemStatuses.GOOD).length
        return total === 0 ? 0 : passed / total
    }

    execute(surveyObject) {
        try {
            const { version, data } = surveyObject
            switch (version) {
                case 1:
                    return {
                        name: data.survey[0][1],
                        tpCount: data.testPoints.length,
                        rtCount: data.rectifiers.length,
                        plCount: data.pipelines.length,
                        successRate: this._getGoodItemCount(data.testPoints, data.rectifiers, 8, 7),
                        uid: data.survey[0][0],
                        assetCount: 0
                    }
                case 2:
                    return {
                        name: data.survey[1],
                        tpCount: data.testPoints.length,
                        rtCount: data.rectifiers.length,
                        plCount: data.pipelines.length,
                        successRate: this._getGoodItemCount(data.testPoints, data.rectifiers, 7, 3),
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