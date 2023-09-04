export class SurveyFileListPresenter {
    constructor() { }

    _getDataFromSurveyObject(surveyObject, fileName, timeModified) {
        return {
            name: surveyObject.data.survey[0][1],
            tpCount: surveyObject.data.testPoints.length,
            rectifierCount: surveyObject.data.rectifiers.length,
            pipelineCount: surveyObject.data.pipelines.length,
            good: surveyObject.data.testPoints.filter(tp => (tp[8] ?? -1) === 0).length + surveyObject.data.rectifiers.filter(tp => (tp[7] ?? -1) === 0).length,
            timeModified: timeModified,
            uid: surveyObject.data.survey[0][0],
            fileName: fileName
        }
    }

    _filterbyDate(data, isSameDay) {
        if (data) {
            const { timeModified } = data
            const currentDate = new Date()
            const surveyDate = new Date(timeModified)
            return isSameDay ? currentDate.toDateString() === surveyDate.toDateString() : currentDate.toDateString() !== surveyDate.toDateString()
        }
        else return false
    }

    executeForLocalFile(surveyObject, fileName, timeModified, filePath, hash) {
        return {
            ...this._getDataFromSurveyObject(surveyObject, fileName, timeModified),
            filePath: filePath,
            hash: hash,
            isCloud: false,
            cloudId: null
        }
    }

    executeForCloudFile(surveyObject, fileName, timeModified, cloudId) {
        return {
            ...this._getDataFromSurveyObject(surveyObject, fileName, timeModified),
            isCloud: true,
            cloudId: cloudId,
            hash: null,
            filePath: null,
        }
    }

    executeForSurveyList(surveyList) {
        return {
            today: surveyList.filter(data => this._filterbyDate(data, true)),
            earlier: surveyList.filter(data => this._filterbyDate(data, false))
        }
    }

    executeForList(surveyFileList) {
        return {
            today: surveyFileList.filter(data => this._filterbyDate(data, true)),
            earlier: surveyFileList.filter(data => this._filterbyDate(data, false))
        }
    }

    execute(surveyFile) {
        return { ...surveyFile }
    }
}