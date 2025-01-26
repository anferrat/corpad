import { useEffect, useState } from "react"
import { AppState } from "react-native"
import { appStateListener } from "../app/controllers/_instances/general_services"

const useIsAppStateActive = () => {
    const [isActive, setIsActive] = useState(AppState.currentState === 'active')

    useEffect(() => {
        const subscription = appStateListener.addStatusListener((state) => setIsActive(state === 'active'))
        return () => {
            subscription.remove()
        }
    }, [])
    return isActive
}

export default useIsAppStateActive