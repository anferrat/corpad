import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation, usePreventRemove } from '@react-navigation/native'
import { EventRegister } from 'react-native-event-listeners'
import { warningHandler } from '../helpers/error_handler'

const transientProperties = new Set([
    'loading',
    'saving',
    'valid',
    'runSaveEffect',
    'defaultName',
    'pipelineList',
    'subitemList',
    'pipelineNameAsDefault',
    'timeModified',
])

const createSnapshot = (data) => JSON.stringify(data, (key, value) => transientProperties.has(key) ? undefined : value)

const useUnsavedChanges = ({ data, ready, additionalData = null, additionalReady = true, saving, deletionEvent, deletionMatcher }) => {
    const navigation = useNavigation()
    const [initialSnapshot, setInitialSnapshot] = useState(null)
    const [initialAdditionalSnapshot, setInitialAdditionalSnapshot] = useState(null)
    const allowNextRemoval = useRef(false)
    const currentSnapshot = createSnapshot(data)
    const currentAdditionalSnapshot = createSnapshot(additionalData)

    useEffect(() => {
        if (ready && initialSnapshot === null)
            setInitialSnapshot(currentSnapshot)
    }, [ready, currentSnapshot, initialSnapshot])

    useEffect(() => {
        if (additionalReady && initialAdditionalSnapshot === null)
            setInitialAdditionalSnapshot(currentAdditionalSnapshot)
    }, [additionalReady, currentAdditionalSnapshot, initialAdditionalSnapshot])

    useEffect(() => {
        if (!deletionEvent)
            return undefined

        const listener = EventRegister.addEventListener(deletionEvent, (payload) => {
            if (deletionMatcher(payload))
                allowNextRemoval.current = true
        })

        return () => EventRegister.removeEventListener(listener)
    }, [deletionEvent, deletionMatcher])

    const allowRemoval = useCallback(() => {
        allowNextRemoval.current = true
    }, [])

    const dataChanged = initialSnapshot !== null && currentSnapshot !== initialSnapshot
    const additionalDataChanged = additionalReady && initialAdditionalSnapshot !== null && currentAdditionalSnapshot !== initialAdditionalSnapshot
    const hasUnsavedChanges = dataChanged || additionalDataChanged

    usePreventRemove(hasUnsavedChanges && !saving, ({ data: actionData }) => {
        if (allowNextRemoval.current) {
            allowNextRemoval.current = false
            navigation.dispatch(actionData.action)
            return
        }

        warningHandler(65, 'Leave', 'Cancel').then((confirm) => {
            if (confirm)
                navigation.dispatch(actionData.action)
        })
    })

    return { allowRemoval }
}

export default useUnsavedChanges
