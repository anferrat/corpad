import { useCallback, useEffect, useRef, useState } from "react"
import { EventRegister } from "react-native-event-listeners"
import { createQrCode, exportQrCode } from "../../../app/controllers/survey/other/ExternalLinkController"
import { errorHandler } from "../../../helpers/error_handler"
import { useDispatch } from "react-redux"
import { setExportModal } from "../../../store/actions/settings"

const initialState = {
    itemType: null,
    itemId: null,
    svg: null
}

const useQrCodeModal = () => {
    const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        const codeListener = EventRegister.addEventListener('GENERATE_QR_CODE_FOR_ITEM', ({ itemId, itemType }) => {
            setData(initialState)
            setLoading(true)
            createQrCode({ itemId, itemType },
                er => errorHandler(er),
                (xmlString) => {
                    if (componentMounted.current)
                        setData({
                            itemId,
                            itemType,
                            svg: xmlString
                        })
                }
            )
                .finally(() => {
                    setLoading(false)
                })
        })
        return () => {
            componentMounted.current = false
            EventRegister.removeEventListener(codeListener)
        }
    }, [])

    const onExportPress = useCallback(async () => {
        setLoading(true)
        const { status, response } = await exportQrCode({ itemId: data.itemId, itemType: data.itemType })
        if (status === 200) {
            const { path, mimeType } = response
            dispatch(setExportModal(true, path, mimeType))
        }
        else
            errorHandler(status)
        setLoading(false)
        setData(initialState)
    }, [data.itemId, data.itemType])

    const onClosePress = useCallback(() => {
        if (!loading)
            setData(initialState)
    }, [loading])

    return {
        loading,
        visible: loading || (data.itemType !== null && data.itemId !== null),
        svg: data.svg,
        itemType: data.itemType,
        onExportPress,
        onClosePress
    }
}

export default useQrCodeModal