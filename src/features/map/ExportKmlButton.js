import React, { useState, useRef, useEffect } from 'react'
import { Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MapButton from './components/MapButton'
import { sendRequest } from '../../api/database/index'
import { writeFile } from '../../api/files/fs'
import { genKml } from '../../helpers/kml_generator'
import { fileNameGen } from '../../helpers/functions'
import { errorHandler } from '../../helpers/error_handler'
import { setExportModal } from '../../store/actions/settings'


const ExportKmlButton = () => {
    const [exporting, setExporting] = useState(false)
    const dispatch = useDispatch()
    const refreshing = useSelector(state => state.map.refreshing)
    const surveyName = useSelector(state => state.settings.currentSurvey.name)
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    const exportKmlHandler = React.useCallback(async (name) => {
        setExporting(true)
        const markers = await sendRequest('SELECT', 'MARKERS', {})
        if (markers.status === 200) {
            const kml = genKml(markers.result)
            const fileName = fileNameGen(name, 'kml')
            const writeFs = await writeFile(kml, fileName, 'exports', false)
            if (writeFs.status === 200) {
                if (componentMounted.current)
                    dispatch(setExportModal({ visible: true, fileUrl: writeFs.filePath, mimeType: 'application/vnd.google-earth.kml+xml' }))
            }
            else errorHandler(writeFs.status)
        }
        else errorHandler(615)
        if (componentMounted.current)
            setExporting(false)
    }, [setExporting])

    const exportAlert = React.useCallback((name) => {
        Alert.alert('Export KML', 'Create basic .kml file with markers', [
            {
                text: 'Export',
                onPress: exportKmlHandler.bind(this, name)
            }
        ],
            {
                cancelable: true
            }
        )
    }, [exportKmlHandler])

    return <MapButton
        disabled={exporting && !refreshing}
        icon={exporting ? 'spinner' : 'download'}
        onPress={exportAlert.bind(this, surveyName)} />
}

export default React.memo(ExportKmlButton)