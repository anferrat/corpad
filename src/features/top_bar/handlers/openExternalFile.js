import { hideLoader, setSurveySettings, updateLoader } from "../../../store/actions/settings"
import { pickExternalSurveyFile } from "../../../app/controllers/survey/SurveyFileController"
import { errorHandler } from "../../../helpers/error_handler"

export const openExternalSurvey = async (dispatch) => {

    const { status, response } = await pickExternalSurveyFile({
        onStatusChanged: (status, data) => {
            if (status === 'selecting')
                dispatch(updateLoader('Selecting file...'))
            else if (status === 'loading') {
                dispatch(updateLoader('Loading file', data.name))
            }
        }
    },
        er => er !== 101 ? errorHandler(er) : null)
    if (status === 200) {
        const { name, fileName, isCloud, syncTime, uid } = response
        dispatch(setSurveySettings(name, fileName, syncTime, isCloud, true, uid))
    }
    dispatch(hideLoader())
}

