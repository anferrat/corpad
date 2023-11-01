import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showPaywall } from "../../../../store/actions/settings"
import { SubscriptionStatuses } from "../../../../constants/global"
import { isProStatus, isVerifyStatus } from "../../../../helpers/functions"

const useMoreOptions = (closeSheet) => {
    const subscriptionStatus = useSelector(state => state.settings.subscription.status)
    const isPro = isProStatus(subscriptionStatus)
    const isVerify = isVerifyStatus(subscriptionStatus)
    const dispatch = useDispatch()
    const onPaywallShow = useCallback(() => {
        closeSheet()
        dispatch(showPaywall())
    }, [dispatch])
    return {
        isPro,
        isVerify,
        onPaywallShow
    }
}

export default useMoreOptions