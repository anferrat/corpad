import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showPaywall } from "../../../../store/actions/settings"
import { openLink } from "../../../../app/controllers/AppController"
import { errorHandler } from "../../../../helpers/error_handler"

const useAbout = () => {
    const { status, expirationTime, managmentUrl } = useSelector(state => state.settings.subscription)
    const dispatch = useDispatch()
    const onShowPaywall = useCallback(() => dispatch(showPaywall()), [])

    const onManageLinkOpen = () => managmentUrl !== null ? openLink({ url: managmentUrl }, er => errorHandler(er)) : null

    return {
        status,
        expirationTime,
        onShowPaywall,
        onManageLinkOpen
    }
}

export default useAbout