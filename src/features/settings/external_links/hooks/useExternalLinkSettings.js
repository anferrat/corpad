import { useState, useEffect, useRef } from "react"
import { deleteAllExternalLinkRecords, getExternalLinkRecords } from "../../../../app/controllers/survey/other/ExternalLinkController"
import { errorHandler, warningHandler } from "../../../../helpers/error_handler"
import { Platform } from "react-native"
import { EventRegister } from 'react-native-event-listeners'

const useExternalLinkSettings = ({ navigateToExternalLink }) => {
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)
    const componentMounted = useRef(true)
    const canScanLabel = Platform.OS === 'ios'

    useEffect(() => {
        componentMounted.current = true

        const onLoad = async () => {
            const { response, status, errorMessage } = await getExternalLinkRecords(er =>
                errorHandler(er),
                (response) => {
                    if (componentMounted.current) {
                        setLoading(false)
                        setRecords(response)
                    }
                }
            )
            console.log(errorMessage)
        }
        const onNewLog = EventRegister.addEventListener('NEW_EXTERNAL_LINK_LOGGED', () => onLoad())
        onLoad()
        return () => {
            componentMounted.current = false
            EventRegister.removeEventListener(onNewLog)
        }
    }, [])

    const onViewLink = (link) => navigateToExternalLink(link)

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

    return {
        records,
        loading,
        canScanLabel,
        onViewLink,
        onDeleteAll
    }
}

export default useExternalLinkSettings