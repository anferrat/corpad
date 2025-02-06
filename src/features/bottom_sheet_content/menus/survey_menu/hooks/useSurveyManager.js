import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveAndResetSurvey, saveSurvey } from "../../../../../app/controllers/survey/SurveyController"
import { errorHandler } from "../../../../../helpers/error_handler"
import { hideLoader, resetCurrentSurveySettings, setActiveMultimeterStatus, setSurveySaving, showPaywall, updateCurrentSurveySettings, updateLoader, updateLoaderProgress, updateSession } from "../../../../../store/actions/settings"
import { hapticMedium } from "../../../../../native_libs/haptics"
import { getFormattedDate, isProStatus, isVerifyStatus } from "../../../../../helpers/functions"
import { MultimeterTypeLabels } from "../../../../../constants/labels"
import { connectMultimeter } from "../../../../../app/controllers/MultimeterController"

const useSurveyManager = ({ hideSheet }) => {
    const { fileName, savingInProgress, lastSyncTime } = useSelector(state => state.settings.currentSurvey)
    const { connected, paired, multimeterType, connecting } = useSelector(state => state.settings.activeMultimeter)
    const subscriptionStatus = useSelector(state => state.settings.subscription.status)
    const isPro = isProStatus(subscriptionStatus)
    const isVerify = isVerifyStatus(subscriptionStatus)
    const dispatch = useDispatch()

    const syncTimeLabel = (lastSyncTime === null ? 'Never saved' : `Last synced: ${getFormattedDate(lastSyncTime)}`)

    const multimeterLablel = paired ? (`${connected && !connecting ? 'Connected' : 'Disconnected'} | ${MultimeterTypeLabels[multimeterType]}`) : null

    const onUpload = useCallback((total, count) => dispatch(updateLoaderProgress(true, 'Uploading assets', total, count)))

    const onPaywallShow = useCallback(() => {
        dispatch(showPaywall())
        hideSheet()
    }, [hideSheet])

    const surveyManagerErrorHandler = useCallback((error, message) => {
        if (error === 302)
            dispatch(updateSession(false))
        else if (error !== 101)
            errorHandler(error)
    }, [])

    const saveSurveyHandler = useCallback(async () => {
        if (!savingInProgress) {
            dispatch(setSurveySaving(true))
            const { response, status } = await saveSurvey({}, surveyManagerErrorHandler)
            if (status === 200) {
                const { fileName, syncTime } = response
                dispatch(updateCurrentSurveySettings(syncTime, fileName))
            }
            else dispatch(setSurveySaving(false))
        }
    }, [savingInProgress, surveyManagerErrorHandler])

    const saveAndResetSurveyHandler = useCallback(async () => {
        if (!savingInProgress) {
            hapticMedium()
            hideSheet()
            dispatch(updateLoader('Saving survey', fileName))
            const { status } = await saveAndResetSurvey({ onUpload }, surveyManagerErrorHandler)
            if (status === 200) {
                dispatch(resetCurrentSurveySettings())
            }
            dispatch(hideLoader())
        }
    }, [savingInProgress, surveyManagerErrorHandler, fileName])

    const onMultimeterConnect = useCallback(async () => {
        await connectMultimeter(0, null, () => dispatch(setActiveMultimeterStatus(true)))
    }, [])

    return {
        saveSurveyHandler,
        saveAndResetSurveyHandler,
        onPaywallShow,
        onMultimeterConnect,
        connecting,
        savingInProgress,
        syncTimeLabel,
        multimeterLablel,
        connected,
        paired,
        isPro,
        isVerify
    }
}

export default useSurveyManager