import { useCallback, useEffect, useRef, useState } from "react"
import useModal from "../../../hooks/useModal"
import { addNfcWritingListener, removeNfcWritingListener } from "../../../app/controllers/survey/other/ExternalLinkController"
import { NFC_STATUS_CODES } from "../helpers/constants"
import { NdefWritingStatuses } from "../../../constants/global"
import { useDispatch } from 'react-redux'
import { blockUrlResolver, unblockUrlResolver } from "../../../app/controllers/AppController"
import { showPaywall } from "../../../store/actions/settings"

const useNfcWriter = ({ itemId, itemType }) => {
    const dispatch = useDispatch()
    const { visible, showModal, hideModal } = useModal(false)
    const [size, setSize] = useState(0)
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(null)
    const [writeDisabled, setWriteDisabled] = useState(false)
    const componentMounted = useRef(true)

    const onShowPaywall = useCallback(() => {
        dispatch(showPaywall())
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

    const writeToTag = useCallback(async () => {
        showModal()
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
        await writeToTag()
    }, [])

    return {
        visible,
        nfcLoading: loading,
        size,
        status,
        writeToTagDisabled: writeDisabled,
        writeToTag,
        retry,
        reset,
        onShowPaywall
    }
}

export default useNfcWriter