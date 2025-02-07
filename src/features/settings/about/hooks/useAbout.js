import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showPaywall } from "../../../../store/actions/settings"
import { openLink } from "../../../../app/controllers/AppController"
import { errorHandler } from "../../../../helpers/error_handler"

const useAbout = () => {
    const { status, expirationTime, managementUrl } = useSelector(state => state.settings.subscription)
    const dispatch = useDispatch()
    const onShowPaywall = useCallback(() => dispatch(showPaywall()), [])

    const onManageLinkOpen = () => managementUrl !== null ? openLink({ url: managementUrl }, er => errorHandler(er)) : null

    return {
        status,
        expirationTime,
        onShowPaywall,
        onManageLinkOpen
    }
}

export default useAbout