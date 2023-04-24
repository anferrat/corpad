import { useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { signInToGoogleDrive } from "../../../app/controllers/survey/GoogleDriveAuthorizationController"
import { updateSession } from '../../../store/actions/settings'
import { errorHandler } from "../../../helpers/error_handler"

const useAuthorization = () => {
    const signing = useSelector(state => state.settings.session.signing)
    const dispatch = useDispatch()

    const signInHandler = useCallback(async () => {
        dispatch(updateSession(false, true))
        await signInToGoogleDrive(
            (er, message) => {
                er !== 101 ? errorHandler(er) : null
                dispatch(updateSession(false, false))
            },
            ({ userName }) => {
                dispatch(updateSession(true, false, userName))
            })
    }, [])

    return {
        signing,
        signInHandler
    }
}

export default useAuthorization