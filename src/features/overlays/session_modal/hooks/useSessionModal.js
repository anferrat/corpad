import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSessionModalVisible, updateSession } from "../../../../store/actions/settings"
import { signInToGoogleDrive, signOutFromGoogleDrive } from "../../../../app/controllers/survey/GoogleDriveAuthorizationController"
import { errorHandler } from "../../../../helpers/error_handler"

const useSessionModal = () => {
    const isInternetOn = useSelector(state => state.settings.session.isInternetOn)
    const userName = useSelector(state => state.settings.session.userName)
    const isSigned = useSelector(state => state.settings.session.isSigned)
    const isVisible = useSelector(state => state.settings.session.sessionModalVisible)
    const signing = useSelector(state => state.settings.session.signing)
    const dispatch = useDispatch()

    const onSignIn = useCallback(async () => {
        let userName = null
        let isSigned = false
        dispatch(updateSession(isSigned, true, userName))
        await signInToGoogleDrive(
            er => {
                er !== 101 ? errorHandler(er) : null
                dispatch(updateSession(false, false))
            },
            (response) => {
                userName = response.userName
                isSigned = true
            })
        dispatch(updateSession(isSigned, false, userName))
        dispatch(setSessionModalVisible(false))
    }, [])

    const onSignOut = useCallback(async () => {
        dispatch(updateSession(true, true))
        await signOutFromGoogleDrive(
            er => {
                errorHandler(er)
                dispatch(updateSession(true, false))
            },
            () => {
                dispatch(updateSession(false, false, null))
            })
        dispatch(setSessionModalVisible(false))
    }, [])

    const hideModal = useCallback(() => dispatch(setSessionModalVisible(false)), [])

    return {
        isInternetOn,
        userName,
        isSigned,
        isVisible,
        signing,
        onSignIn,
        onSignOut,
        hideModal
    }
}

export default useSessionModal