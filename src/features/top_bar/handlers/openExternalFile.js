import { setSurveySettings, updateLoader } from "../../../store/actions/settings"
import { loadExternalSurveyFile } from "../../../app/controllers/survey/SurveyFileController"
import { errorHandler } from "../../../helpers/error_handler"

export const openExternalSurvey = async (dispatch) => {

    const { status, response } = await loadExternalSurveyFile({
        onStatusChanged: (status, data) => {
            if (status === 'selecting')
                dispatch(updateLoader(true, 'Selecting file...'))
            else if (status === 'loading') {
                dispatch(updateLoader(true, 'Loading file', data.name))
            }
        }
    },
        er => er !== 101 ? errorHandler(er) : null)
    if (status === 200) {
        const { name, fileName, isCloud, syncTime } = response
        dispatch(setSurveySettings(name, fileName, syncTime, isCloud, true))
    }
    dispatch(updateLoader(false, null, null))
}

