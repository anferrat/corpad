import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { unpairMultimeter, connectMultimeter, } from '../../../../../app/controllers/MultimeterController'
import { setActiveMultimeter, setActiveMultimeterStatus, showPaywall } from '../../../../../store/actions/settings'
import { errorHandler, warningHandler } from '../../../../../helpers/error_handler'
import { hapticMedium } from '../../../../../native_libs/haptics'
import { isProStatus } from '../../../../../helpers/functions'


const usePairedView = () => {
    const dispatch = useDispatch()
    const { connected, connecting, name, multimeterType } = useSelector(state => state.settings.activeMultimeter)
    const isPro = useSelector(state => isProStatus(state.settings.subscription.status))
    const componentMounted = useRef(true)


    useEffect(() => {
        componentMounted.current = true
        return () => componentMounted.current = false
    }, [])

    const unpairDevice = useCallback(async () => {
        const confirm = await warningHandler(63, 'Unpair', 'Cancel')
        if (connecting || !confirm)
            return
        const { status } = await unpairMultimeter(connected)
        if (status === 200) {
            dispatch(setActiveMultimeter(false, null, null, null, false))
            hapticMedium()
            return
        }
        else if (componentMounted.current)
            errorHandler(status)
    }, [dispatch, connected, connecting])

    const connectToActiveMultimeter = useCallback(async () => {
        if (!isPro)
            return dispatch(showPaywall())
        if (connected || connecting)
            return
        const { status } = await connectMultimeter(0)
        if (status === 200)
            return dispatch(setActiveMultimeterStatus(true)) //duplicates global listener. needed as last resort to keep state up to date
        if (status !== 200 && componentMounted.current)
            errorHandler(status)
    }, [connected, isPro, connecting, dispatch])

    return {
        name,
        type: multimeterType,
        connecting,
        connected,
        connect: connectToActiveMultimeter,
        unpair: unpairDevice,
        unpairing: connected && connecting
    }

}

export default usePairedView