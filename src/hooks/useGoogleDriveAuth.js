import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateSession } from '../store/actions/settings'
import { errorHandler } from '../helpers/error_handler'
import { signOutFromGoogleDrive } from '../app/controllers/survey/GoogleDriveAuthorizationController'


const useGoogleDriveAuth = () => {
    const dispatch = useDispatch()
    const signing = useSelector(state => state.settings.session.signing)
    const isSigned = useSelector(state => state.settings.session.isSigned)
    const userName = useSelector(state => state.settings.session.userName)

    const signOut = useCallback(async () => {
        dispatch(updateSession(true, true))
        await signOutFromGoogleDrive(
            (status) => errorHandler(status),
            () => dispatch(updateSession(false, false, null)))
    }, [])

    return {
        signing,
        isSigned,
        userName,
        signOut
    }

}

export default useGoogleDriveAuth