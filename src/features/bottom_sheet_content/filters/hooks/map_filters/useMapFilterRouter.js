import { useEffect, useState } from "react"
import { MapFilterScreens } from "../../constants/constants"
import { EventRegister } from "react-native-event-listeners"

const useMapFilterRouter = () => {
    const [screen, setScreen] = useState(MapFilterScreens.LIST)

    const goToList = () => setScreen(MapFilterScreens.LIST)

    const applyButtonVisible = screen !== MapFilterScreens.LIST

    useEffect(() => {
        const closingListener = EventRegister.addEventListener('BOTTOM_SHEET_CLOSING', () => {
            if (screen !== MapFilterScreens.LIST)
                goToList()
        })
        return () => {
            EventRegister.removeEventListener(closingListener)
        }
    }, [screen])

    return {
        navigateToScreen: setScreen,
        goToList,
        screen,
        applyButtonVisible,
    }
}

export default useMapFilterRouter