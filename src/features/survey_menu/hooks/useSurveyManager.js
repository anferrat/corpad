import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveAndResetSurvey, saveSurvey } from "../../../app/controllers/survey/SurveyController"
import { errorHandler } from "../../../helpers/error_handler"
import { resetCurrentSurveySettings, setSurveySaving, updateCurrentSurveySettings, updateLoader, updateSession } from "../../../store/actions/settings"
import { hapticMedium } from "../../../native_libs/haptics"
import { getFormattedDate } from "../../../helpers/functions"
import { MultimeterTypeLabels } from "../../../constants/labels"

const useSurveyManager = ({ hideSheet }) => {
    const { fileName, savingInProgress, lastSyncTime } = useSelector(state => state.settings.currentSurvey)
    const { connected, paired, multimeterType } = useSelector(state => state.settings.activeMultimeter)
    const dispatch = useDispatch()
    const syncTimeLabel = (lastSyncTime === null ? 'Never saved' : `Last synced: ${getFormattedDate(lastSyncTime)}`)

    const multimeterLablel = paired ? (`${connected ? 'Connected' : 'Disconnected'} | ${MultimeterTypeLabels[multimeterType]}`) : null

    const surveyManagerErroHandler = useCallback((error, message) => {
        if (error === 302)
            dispatch(updateSession(false))
        else if (error !== 101)
            errorHandler(error)
    }, [])

    const saveSurveyHandler = useCallback(async () => {
        if (!savingInProgress) {
            dispatch(setSurveySaving(true))
            const { response, status } = await saveSurvey(surveyManagerErroHandler)
            if (status === 200) {
                const { fileName, syncTime } = response
                dispatch(updateCurrentSurveySettings(syncTime, fileName))
            }
            else dispatch(setSurveySaving(false))
        }
    }, [savingInProgress, surveyManagerErroHandler])

    const saveAndResetSurveyHandler = useCallback(async () => {
        if (!savingInProgress) {
            hapticMedium()
            hideSheet()
            dispatch(updateLoader(true, 'Saving survey', fileName))
            const { status } = await saveAndResetSurvey(surveyManagerErroHandler)
            if (status === 200) {
                dispatch(resetCurrentSurveySettings())
            }
            dispatch(updateLoader(false, null, null))
        }
    }, [savingInProgress, surveyManagerErroHandler, fileName])

    return {
        saveSurveyHandler,
        saveAndResetSurveyHandler,
        savingInProgress,
        syncTimeLabel,
        multimeterLablel,
        connected,
        paired
    }
}

export default useSurveyManager