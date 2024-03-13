import { useState, useEffect, useRef, useCallback } from "react"
import { deleteAllExternalLinkRecords, getExternalLinkRecords, readNfcTagIos } from "../../../../app/controllers/survey/other/ExternalLinkController"
import { errorHandler, warningHandler } from "../../../../helpers/error_handler"
import { Platform } from "react-native"
import { EventRegister } from 'react-native-event-listeners'

const useExternalLinkSettings = ({ navigateToExternalLink }) => {
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const [scanDisabled, setScanDisabled] = useState(false)
    const componentMounted = useRef(true)
    const canScanLabel = Platform.OS === 'ios'

    useEffect(() => {
        componentMounted.current = true

        const onLoad = async () => {
            await getExternalLinkRecords(er =>
                errorHandler(er),
                (response) => {
                    if (componentMounted.current) {
                        setLoading(false)
                        setRecords(response)
                    }
                }
            )
        }
        const onNewLog = EventRegister.addEventListener('NEW_EXTERNAL_LINK_LOGGED', onLoad)
        onLoad()
        return () => {
            componentMounted.current = false
            EventRegister.removeEventListener(onNewLog)
        }
    }, [])

    const onViewLink = (link) => navigateToExternalLink(link, false)

    const onDeleteAll = async () => {
        if (!loading) {
            const confirm = await warningHandler(62, 'Delete all', 'Cancel')
            if (confirm) {
                await deleteAllExternalLinkRecords()
                if (componentMounted.current)
                    setRecords([])
            }
        }
    }

    const onReadTagIos = useCallback(async () => {
        setScanDisabled(true)
        await readNfcTagIos(
            er => er === 843 ? errorHandler(er) : null,
            (link) => navigateToExternalLink(link, true))
        if (componentMounted.current)
            setScanDisabled(false)
    }, [])

    return {
        records,
        loading,
        canScanLabel,
        scanDisabled,
        onViewLink,
        onDeleteAll,
        onReadTagIos,
    }
}

export default useExternalLinkSettings