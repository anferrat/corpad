import { useEffect } from "react"
import { EventRegister } from "react-native-event-listeners"
import { useDispatch, useSelector } from "react-redux"
import { addMultimeterStatusListener, connectMultimeter } from "../../app/controllers/MultimeterController"
import { setActiveMultimeterConnecting, setActiveMultimeterStatus } from "../../store/actions/settings"

export const useMultimeterStatus = () => {
    const connected = useSelector(state => state.settings.activeMultimeter.connected)
    const dispatch = useDispatch()

    useEffect(() => {
        const statusListener = addMultimeterStatusListener(({ isConnected }) => {
            console.log('MULTIMETER IS CONNECTED ', isConnected)
            dispatch(setActiveMultimeterStatus(isConnected))
        })

        const isConnectingListener = EventRegister.addEventListener('MULTIMETER_IS_CONNECTING', (isConnecting) => {
            console.log('IS CONNECTING ', isConnecting)
            dispatch(setActiveMultimeterConnecting(isConnecting))
        })

        return () => {
            EventRegister.removeEventListener(isConnectingListener)
            if (statusListener.response)
                statusListener.response.remove()
        }
    }, [])

    useEffect(() => {
        //Attempt to reconnect after disconnect
        return () => {
            if (connected) {
                connectMultimeter(2000)
            }
        }
    }, [connected])
}