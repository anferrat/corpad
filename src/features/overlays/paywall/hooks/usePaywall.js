import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOfferings, purchaseSubscription, restorePurchases, updateSubscriptionStatus as verifySubscription } from "../../../../app/controllers/survey/other/PurchaseController"
import { hidePaywall, updateSubscriptionStatus } from "../../../../store/actions/settings"
import { errorHandler } from "../../../../helpers/error_handler"
import { openLink } from "../../../../app/controllers/AppController"

const usePaywall = () => {
    const status = useSelector(state => state.settings.subscription.status)
    const visible = useSelector(state => state.settings.subscription.paywallVisible)
    const isInternetOn = useSelector(state => state.settings.session.isInternetOn)
    const expirationTime = useSelector(state => state.settings.subscription.expirationTime)
    const dispatch = useDispatch()
    const [processing, setProcessing] = useState(false)
    const [price, setPrice] = useState({
        value: null,
        pack: null
    })
    const isUnavailable = price.value === null || price.value === undefined

    useEffect(() => {
        const loadData = async () => {
            const { status, response } = await getOfferings()
            if (status === 200) {
                if (response && response.product)
                    setPrice({
                        value: response.product.priceString,
                        pack: response
                    })
            }
        }
        if (isUnavailable)
            loadData()
    }, [visible, isInternetOn])

    const onClose = useCallback(() => {
        dispatch(hidePaywall())
    }, [])

    const onPurchase = useCallback(async () => {
        setProcessing(true)
        await purchaseSubscription(
            { pack: price.pack },
            (er) => er !== 101 ? errorHandler(er) : null,
            ({ status, expirationTime }) => dispatch(updateSubscriptionStatus(status, expirationTime)))
        setProcessing(false)
    }, [price.pack])

    const onVerify = useCallback(async () => {
        if (isInternetOn) {
            setProcessing(true)
            await verifySubscription(
                (er) => errorHandler(er),
                ({ status, expirationTime }) => dispatch(updateSubscriptionStatus(status, expirationTime))
            )
            setProcessing(false)
        }
        else
            errorHandler(116)
    }, [isInternetOn])

    const onRestore = useCallback(async () => {
        setProcessing(true)
        await restorePurchases(
            (er) => errorHandler(er),
            ({ status, expirationTime }) => dispatch(updateSubscriptionStatus(status, expirationTime)))
        setProcessing(false)
    }, [])

    const viewTermsAndConditions = useCallback(() => {
        openLink({ url: 'https://www.corpad.ca/legal/terms-and-conditions' },
            er => errorHandler(er))
    }, [])

    return {
        price: price.value,
        onClose,
        onPurchase,
        visible,
        status,
        processing,
        isUnavailable,
        expirationTime,
        onRestore,
        onVerify,
        viewTermsAndConditions
    }
}

export default usePaywall