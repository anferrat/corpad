import { useState, useCallback, useRef, useEffect } from 'react'
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { exportMarkers } from '../../../app/controllers/survey/items/MarkerController'
import { errorHandler } from '../../../helpers/error_handler'
import { setExportModal } from '../../../store/actions/settings'

const useMarkerExport = () => {
    const [exporting, setExporting] = useState(false)
    const dispatch = useDispatch()
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    const exportMarkersToFile = useCallback(async () => {
        setExporting(true)
        const { status, response, errorMessage } = await exportMarkers(er => errorHandler(er))
        if (status === 200) {
            dispatch(setExportModal({ visible: true, fileUrl: response, mimeType: 'application/vnd.google-earth.kml+xml' }))
        }
        if (componentMounted.current)
            setExporting(false)
    }, [])

    const exportHandler = useCallback(() => {
        Alert.alert('Export KML', 'Create basic .kml file with markers', [
            {
                text: 'Export',
                onPress: exportMarkersToFile
            }
        ],
            {
                cancelable: true
            }
        )
    }, [exportMarkersToFile])

    return { exporting, exportHandler }
}

export default useMarkerExport