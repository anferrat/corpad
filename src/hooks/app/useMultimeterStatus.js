import { useEffect, useState } from "react"
import { EventRegister } from "react-native-event-listeners"
import { useDispatch, useSelector } from "react-redux"
import { addMultimeterStatusListener, addMultimeterToggleStatusListener, connectMultimeter, getMultimeterToggleStatus } from "../../app/controllers/MultimeterController"
import { setActiveMultimeterConnecting, setActiveMultimeterStatus, setActiveMultimeterToggleStatus } from "../../store/actions/settings"
import useIsAppStateActive from "../useIsAppStateActive"

export const useMultimeterStatus = () => {
    const connected = useSelector(state => state.settings.activeMultimeter.connected)
    const connecting = useSelector(state => state.settings.activeMultimeter.connecting)
    const multimeterType = useSelector(state => state.settings.activeMultimeter.multimeterType)
    const peripheralId = useSelector(state => state.settings.activeMultimeter.id)
    const bleInitialized = useSelector(state => state.settings.bluetooth.initialized)
    const isStateActive = useIsAppStateActive()
    const toggleStatusObtained = useSelector(state => state.settings.activeMultimeter.toggleStatus !== null)
    const dispatch = useDispatch()
    const [toggleStatusRequested, setToggleStatusRequested] = useState(false)
    const isToggleStatusAvailable = connected && !connecting && peripheralId && multimeterType && isStateActive
    const isToggleStatusNeeded = isToggleStatusAvailable && !toggleStatusObtained && !toggleStatusRequested && bleInitialized
    const TOGGLE_STATUS_REQUEST_DELAY = 0
    const TOGGLE_STATUS_RESEND_REQUEST_DELAY = 2000

    useEffect(() => {
        //tracks connection status of active multimeter
        const statusListener = peripheralId && multimeterType ? addMultimeterStatusListener(({ isConnected }) => {
            dispatch(setActiveMultimeterStatus(isConnected))
        }, peripheralId) : null

        return () => {
            statusListener !== null ? statusListener.response.remove() : null
        }
    }, [peripheralId, multimeterType])

    useEffect(() => {
        //listens for toggle
        const toggleListener = isToggleStatusAvailable ? addMultimeterToggleStatusListener(
            (toggleStatus) => dispatch(setActiveMultimeterToggleStatus(toggleStatus)),
            (er) => { },
            peripheralId,
            multimeterType) : null
        return () => {
            toggleListener !== null ? toggleListener.response.remove() : null
        }
    }, [connected, connecting, peripheralId, peripheralId, isStateActive])

    useEffect(() => {
        if (isToggleStatusNeeded)
            setTimeout(() => {
                setToggleStatusRequested(true)
                getMultimeterToggleStatus({ peripheralId, multimeterType },
                    er => { },
                    toggleStatus => {
                        dispatch(setActiveMultimeterToggleStatus(toggleStatus))
                    }
                )
                    .finally(() => setTimeout(() => {
                        setToggleStatusRequested(false)
                    }, TOGGLE_STATUS_RESEND_REQUEST_DELAY))
            }, TOGGLE_STATUS_REQUEST_DELAY)
    }, [connected, connecting, peripheralId, multimeterType, isStateActive, isToggleStatusAvailable, toggleStatusObtained, toggleStatusRequested])

    useEffect(() => () => {
        //reset toggle status when app is in background
        if (isStateActive || !connected || peripheralId === null)
            dispatch(setActiveMultimeterToggleStatus(null))
    }, [isStateActive, connected, peripheralId])


    useEffect(() => {
        return () => {
            if (connected) {
                //Attempt to reconnect after disconnect
                connectMultimeter(2000)
            }
        }
    }, [connected])

    useEffect(() => {
        //tracks connecting/disconnecting of multimeter
        const isConnectingListener = EventRegister.addEventListener('MULTIMETER_IS_CONNECTING', (isConnecting) => {
            dispatch(setActiveMultimeterConnecting(isConnecting))
        })
        return () => {
            EventRegister.removeEventListener(isConnectingListener)
        }
    }, [])
}