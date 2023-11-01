import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showPaywall } from "../../../../store/actions/settings"

const useAbout = () => {
    const { status, expirationTime } = useSelector(state => state.settings.subscription)
    const dispatch = useDispatch()
    const onShowPaywall = useCallback(() => dispatch(showPaywall()), [])
    return {
        status,
        expirationTime,
        onShowPaywall
    }
}

export default useAbout