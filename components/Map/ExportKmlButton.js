import React, { useState, useRef, useEffect } from 'react'
import MapButton from '../_Stateless/Map/MapButton'
import { sendRequest } from '../../database/db'
import { writeFile } from '../../files/local/fs'
import { genKml } from '../../files/helpers/genKml'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-native'
import { fileNameGen } from '../customFunctions'
import { errorHandler } from '../errorHandler'
import { updateSetting } from '../../store/actions/settings'
import { useNavigation } from '@react-navigation/native'


const ExportKmlButton = () => {
    const [exporting, setExporting] = useState(false)
    const dispatch = useDispatch()
    const refreshing = useSelector(state => state.map.refreshing)
    const surveyName = useSelector(state => state.settings.currentSurvey.name)
    const componentMounted = useRef(true)
    const navigation = useNavigation()

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
                    dispatch(updateSetting('exportModal', { visible: true, fileUrl: writeFs.filePath, mimeType: 'application/vnd.google-earth.kml+xml', navigateToExportedFiles: navigation.navigate.bind(this, 'SettingDetails', { setting: 'exportedFiles' }) }))
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