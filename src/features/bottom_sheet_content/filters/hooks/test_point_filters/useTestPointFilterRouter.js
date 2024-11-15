import { useEffect, useState } from "react"
import { TestPointFilterScreens } from "../../constants/constants"
import { EventRegister } from "react-native-event-listeners"

const useTestPointFilterRouter = () => {
    const [screen, setScreen] = useState(TestPointFilterScreens.LIST)

    const goToList = () => setScreen(TestPointFilterScreens.LIST)

    const applyButtonVisible = screen !== TestPointFilterScreens.LIST

    useEffect(() => {
        const closingListener = EventRegister.addEventListener('BOTTOM_SHEET_CLOSING', () => {
            if (screen !== TestPointFilterScreens.LIST)
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

export default useTestPointFilterRouter