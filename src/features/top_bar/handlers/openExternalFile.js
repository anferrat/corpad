import { updateSetting, loadSurveySettings } from "../../../store/actions/settings"
import { pickFile } from "../../../native_libs/document_picker"
import { surveyLoader } from "../../../services/survey/manager"


export const openExternalSurvey = async (dispatch) => {
    const externalFile = await pickFile('json')
    if (externalFile.status === 200) {
        dispatch(updateSetting('loader', { visible: true, title: 'Opening' }))
        const extSurvey = await surveyLoader(externalFile.result.uri, 'external', externalFile.result.name)
        if (extSurvey.status === 200)
            dispatch(loadSurveySettings({
                isLoaded: true,
                name: extSurvey.name,
                fileName: extSurvey.fileName,
                isCloudSurvey: extSurvey.isCloud,
                syncTime: extSurvey.syncTime
            }))
        else
            errorHandler(extSurvey.status)
        dispatch(updateSetting('loader', { visible: false }))
    }
}

