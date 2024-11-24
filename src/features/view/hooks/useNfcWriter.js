import { useCallback, useEffect, useRef, useState } from "react"
import useModal from "../../../hooks/useModal"
import { addNfcWritingListener, removeNfcWritingListener } from "../../../app/controllers/survey/other/ExternalLinkController"
import { NFC_STATUS_CODES } from "../helpers/constants"
import { NdefWritingStatuses } from "../../../constants/global"
import { blockUrlResolver, openLink, unblockUrlResolver } from "../../../app/controllers/AppController"
import { Platform } from "react-native"
import { errorHandler } from "../../../helpers/error_handler"
import { EventRegister } from "react-native-event-listeners"

const useNfcWriter = () => {
    const { visible, showModal, hideModal } = useModal(false)
    const [size, setSize] = useState(0)
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(null)
    const [writeDisabled, setWriteDisabled] = useState(false)
    const componentMounted = useRef(true)

    const handleTagErrorLink = useCallback(() => {
        openLink({ url: 'https://docs.corpad.ca/tag-errors' },
            er => errorHandler(er))
    }, [])

    useEffect(() => {
        if (visible) {
            blockUrlResolver()
            componentMounted.current = true
        }
        return () => {
            if (visible) {
                unblockUrlResolver()
                componentMounted.current = false
            }
        }
    }, [visible])

    useEffect(() => {
        const tagListener = EventRegister.addEventListener('NFC_TAG_WRITE', ({ itemId, itemType }) => {
            writeToTag(itemId, itemType)
        })
        return () => {
            EventRegister.removeEventListener(tagListener)
        }
    }, [])

    const writeToTag = useCallback(async (itemId, itemType) => {
        showModal()
        if (Platform.OS === 'ios')
            setWriteDisabled(true)
        setLoading(true)
        await addNfcWritingListener({ itemId, itemType },
            (status) => {
                if (componentMounted.current) {
                    setStatus(status)
                    setLoading(false)
                }
            },
            (writeStatus, payload) => {
                if (componentMounted.current) {
                    switch (writeStatus) {
                        case NdefWritingStatuses.LINK_CREATED:
                            setSize(payload.size)
                            setLoading(false)
                            return
                        case NdefWritingStatuses.NDEF_TECHNOLOGY_REQUESTED:
                            setLoading(true)
                            return
                        case NdefWritingStatuses.WRITE_COMPLETED: {
                            setLoading(false)
                            setStatus(NFC_STATUS_CODES.SUCCESS)
                            return
                        }
                    }
                }
            })
        if (Platform.OS === 'ios')
            await reset()
    }, [])

    const reset = useCallback(async () => {
        hideModal()
        setLoading(true)
        setWriteDisabled(true)
        await removeNfcWritingListener()
        setWriteDisabled(false)
        setSize(0)
        setStatus(null)
    }, [])

    const retry = useCallback(async () => {
        setStatus(null)
        setSize(0)
        setLoading(true)
        await removeNfcWritingListener()
        await writeToTag()
    }, [])

    return {
        visible: visible && Platform.OS === 'android',
        nfcLoading: loading,
        size,
        status,
        writeToTagDisabled: writeDisabled,
        writeToTag,
        retry,
        reset,
        handleTagErrorLink
    }
}

export default useNfcWriter