import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isProStatus } from "../../../../helpers/functions"
import { EventRegister } from "react-native-event-listeners"
import { showPaywall } from "../../../../store/actions/settings"

export const useLabelPicker = ({ itemId, itemType, closeSheet }) => {
    const dispatch = useDispatch()
    const isPro = useSelector(state => isProStatus(state.settings.subscription.status))
    const actionStarted = useRef(false)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        const closingListener = EventRegister.addEventListener('BOTTOM_SHEET_CLOSING', () => {
            actionStarted.current = false
            setIsProcessing(false)
        })
        return () => EventRegister.removeEventListener(closingListener)
    }, [])

    const emitLabelAction = (event) => {
        if (!isPro || actionStarted.current)
            return

        actionStarted.current = true
        setIsProcessing(true)
        closeSheet()
        EventRegister.emit(event, { itemId, itemType })
    }

    const onPressNFC = () => {
        if (isPro)
            emitLabelAction('NFC_TAG_WRITE')
        else {
            closeSheet()
            dispatch(showPaywall())
        }
    }

    const onPressQrCode = () => {
        if (isPro)
            emitLabelAction('GENERATE_QR_CODE_FOR_ITEM')
        else {
            closeSheet()
            dispatch(showPaywall())
        }
    }

    return {
        isPro,
        isProcessing,
        onPressNFC,
        onPressQrCode
    }
}
