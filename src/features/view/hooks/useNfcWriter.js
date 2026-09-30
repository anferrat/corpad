import { useCallback, useEffect, useRef, useState } from "react"
import useModal from "../../../hooks/useModal"
import { addNfcWritingListener, removeNfcWritingListener } from "../../../app/controllers/survey/other/ExternalLinkController"
import { NFC_STATUS_CODES } from "../helpers/constants"
import { NdefWritingStatuses } from "../../../constants/global"
import { blockUrlResolver, openLink, unblockUrlResolver } from "../../../app/controllers/AppController"
import { Platform } from "react-native"
import { errorHandler } from "../../../helpers/error_handler"
import { EventRegister } from "react-native-event-listeners"
import { useIsFocused } from "@react-navigation/native"

const useNfcWriter = ({ itemId, itemType }) => {
    const { visible, showModal, hideModal } = useModal(false)
    const isFocused = useIsFocused()
    const [size, setSize] = useState(0)
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(null)
    const [writeDisabled, setWriteDisabled] = useState(false)
    const componentMounted = useRef(true)
    const operation = useRef({ id: 0, active: false, canceling: false })
    const target = useRef({ itemId, itemType })

    const handleTagErrorLink = useCallback(() => {
        openLink({ url: 'https://docs.corpad.ca/tag-errors' },
            er => errorHandler(er))
    }, [])

    useEffect(() => {
        if (visible) {
            blockUrlResolver()
        }
        return () => {
            if (visible)
                unblockUrlResolver()
        }
    }, [visible])

    useEffect(() => {
        return () => {
            componentMounted.current = false
            const shouldCancel = operation.current.active || operation.current.canceling
            operation.current = { id: operation.current.id + 1, active: false, canceling: shouldCancel }
            if (shouldCancel)
                removeNfcWritingListener()
        }
    }, [])

    const reset = useCallback(async () => {
        const operationId = operation.current.id
        operation.current = { id: operationId + 1, active: operation.current.active, canceling: true }
        hideModal()
        setLoading(true)
        setWriteDisabled(true)
        try {
            await removeNfcWritingListener()
        }
        finally {
            if (componentMounted.current) {
                setWriteDisabled(false)
                setSize(0)
                setStatus(null)
            }
            if (operation.current.id === operationId + 1)
                operation.current = { id: operation.current.id, active: false, canceling: false }
        }
    }, [hideModal])

    const writeToTag = useCallback(async (requestedItemId = itemId, requestedItemType = itemType) => {
        if (!isFocused || operation.current.active || operation.current.canceling)
            return

        const operationId = operation.current.id + 1
        operation.current = { id: operationId, active: true, canceling: false }
        target.current = { itemId: requestedItemId, itemType: requestedItemType }
        showModal()
        if (Platform.OS === 'ios')
            setWriteDisabled(true)
        setLoading(true)
        try {
            await addNfcWritingListener({ itemId: requestedItemId, itemType: requestedItemType },
                (errorStatus) => {
                    if (componentMounted.current && operation.current.id === operationId) {
                        setStatus(errorStatus)
                        setLoading(false)
                    }
                },
                (writeStatus, payload) => {
                    if (componentMounted.current && operation.current.id === operationId) {
                        switch (writeStatus) {
                            case NdefWritingStatuses.LINK_CREATED:
                                setSize(payload.size)
                                setLoading(false)
                                return
                            case NdefWritingStatuses.NDEF_TECHNOLOGY_REQUESTED:
                                setLoading(true)
                                return
                            case NdefWritingStatuses.WRITE_COMPLETED:
                                setLoading(false)
                                setStatus(NFC_STATUS_CODES.SUCCESS)
                                return
                        }
                    }
                })
            if (Platform.OS === 'ios')
                await reset()
        }
        finally {
            if (operation.current.id === operationId)
                operation.current = { id: operationId, active: false, canceling: false }
        }
    }, [isFocused, itemId, itemType, reset, showModal])

    useEffect(() => {
        if (!isFocused)
            return

        const tagListener = EventRegister.addEventListener('NFC_TAG_WRITE', (event) => {
            if (event.itemId === itemId && event.itemType === itemType)
                writeToTag(event.itemId, event.itemType)
        })
        return () => EventRegister.removeEventListener(tagListener)
    }, [isFocused, itemId, itemType, writeToTag])

    useEffect(() => {
        if (!isFocused && operation.current.active)
            reset()
    }, [isFocused, reset])

    const retry = useCallback(async () => {
        if (operation.current.active || operation.current.canceling)
            return

        setStatus(null)
        setSize(0)
        setLoading(true)
        await removeNfcWritingListener()
        await writeToTag(target.current.itemId, target.current.itemType)
    }, [writeToTag])

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
