import { useCallback, useEffect, useRef, useState } from "react"
import { EventRegister } from "react-native-event-listeners"
import { createQrCode, exportQrCode } from "../../../app/controllers/survey/other/ExternalLinkController"
import { errorHandler } from "../../../helpers/error_handler"
import { useDispatch } from "react-redux"
import { setExportModal } from "../../../store/actions/settings"
import { useIsFocused } from "@react-navigation/native"

const initialState = {
    itemType: null,
    itemId: null,
    svg: null
}

const useQrCodeModal = ({ itemId, itemType }) => {
    const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const componentMounted = useRef(true)
    const generation = useRef({ id: 0, active: false })
    const exportInProgress = useRef(false)

    useEffect(() => {
        return () => {
            componentMounted.current = false
        }
    }, [])

    useEffect(() => {
        if (!isFocused)
            return

        const codeListener = EventRegister.addEventListener('GENERATE_QR_CODE_FOR_ITEM', (event) => {
            if (event.itemId !== itemId || event.itemType !== itemType || generation.current.active)
                return

            const generationId = generation.current.id + 1
            generation.current = { id: generationId, active: true }
            setData(initialState)
            setLoading(true)
            createQrCode({ itemId: event.itemId, itemType: event.itemType },
                er => errorHandler(er),
                (xmlString) => {
                    if (componentMounted.current && generation.current.id === generationId)
                        setData({
                            itemId: event.itemId,
                            itemType: event.itemType,
                            svg: xmlString
                        })
                }
            )
                .finally(() => {
                    if (componentMounted.current && generation.current.id === generationId)
                        setLoading(false)
                    if (generation.current.id === generationId)
                        generation.current = { id: generationId, active: false }
                })
        })
        return () => EventRegister.removeEventListener(codeListener)
    }, [isFocused, itemId, itemType])

    const onExportPress = useCallback(async () => {
        if (exportInProgress.current || data.itemId === null || data.itemType === null)
            return

        exportInProgress.current = true
        setLoading(true)
        try {
            const { status, response } = await exportQrCode({ itemId: data.itemId, itemType: data.itemType })
            if (status === 200) {
                const { path, mimeType } = response
                dispatch(setExportModal(true, path, mimeType))
            }
            else
                errorHandler(status)
        }
        finally {
            exportInProgress.current = false
            if (componentMounted.current) {
                setLoading(false)
                setData(initialState)
            }
        }
    }, [data.itemId, data.itemType, dispatch])

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
