import { useDispatch, useSelector } from "react-redux"
import { isProStatus } from "../../../../helpers/functions"
import { EventRegister } from "react-native-event-listeners"
import { showPaywall } from "../../../../store/actions/settings"

export const useLabelPicker = ({ itemId, itemType, closeSheet }) => {
    const dispatch = useDispatch()
    const isPro = useSelector(state => isProStatus(state.settings.subscription.status))

    const onPressNFC = () => {
        closeSheet()
        isPro ? EventRegister.emit('NFC_TAG_WRITE', { itemId, itemType }) : dispatch(showPaywall())
    }

    const onPressQrCode = () => {
        closeSheet()
        isPro ? EventRegister.emit('GENERATE_QR_CODE_FOR_ITEM', { itemId, itemType }) : dispatch(showPaywall())
    }

    return {
        isPro,
        onPressNFC,
        onPressQrCode
    }
}