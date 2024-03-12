export class SurveyFileListPresenter {
    constructor() { }

    _filterbyDate(data, isSameDay) {
        if (data) {
            const { timeModified } = data
            const currentDate = new Date()
            const surveyDate = new Date(timeModified)
            return isSameDay ? currentDate.toDateString() === surveyDate.toDateString() : currentDate.toDateString() !== surveyDate.toDateString()
        }
        else return false
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