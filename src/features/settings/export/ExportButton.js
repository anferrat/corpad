import React, { useRef, useEffect } from 'react'
import { Button } from '@ui-kitten/components'
import { styles } from './styles/styles'
import { useSelector, useDispatch } from 'react-redux'
import { sendRequest } from '../../../api/database/index'
import { cardProperties, circuitProperties, exportItemProperties, exportSubitemProperties, exportPipelinePotentials, exportPotentials, exportedPropertyListHandler } from './helpers/functions'
import { genCsv } from '../../../helpers/csv_generator'
import { writeFile } from '../../../api/files/fs'
import { fileNameGen } from '../../../helpers/functions'
import { errorHandler } from '../../../helpers/error_handler'
import { setExportModal, updateSetting } from '../../../store/actions/settings'

const ExportButton = () => {
    const settings = useSelector(state => state.exportSurvey)
    const surveyName = useSelector(state => state.settings.currentSurvey.name)
    const dispatch = useDispatch()
    const componentMounted = useRef(true)
    const exportHandler = React.useCallback(async (
        itemType,
        sorting,
        selectedProperties,
        selectedPotentialTypes,
        selectedPipelines, selectedReferenceId,
        selectedPotentialReadings,
        selectedReadings,
        selectedCircuits) => {
        dispatch(updateSetting('loader', { visible: true, title: 'Exporting', text: 'Converting item properties' }))
        const itemList = (await sendRequest('EXPORT', 'ITEM_LIST', { dataType: itemType, sorting: sorting })).result
        const itemData = await exportItemProperties(itemType, selectedProperties, itemList)
        switch (itemType) {
            case 'TEST_POINT':
                if (componentMounted.current)
                    dispatch(updateSetting('loader', { visible: true, title: 'Exporting', text: 'Converting potential data' }))
                else return []
                const pipePotentials = await exportPipelinePotentials(
                    itemList,
                    selectedPotentialTypes,
                    selectedPipelines,
                    selectedReferenceId,
                    selectedPotentialReadings.filter(r => r === 'PL' || r === 'RS'))
                const potentials = await exportPotentials(
                    itemList,
                    selectedPotentialTypes,
                    selectedReferenceId,
                    selectedPotentialReadings)
                if (componentMounted.current)
                    dispatch(updateSetting('loader', { visible: true, title: 'Exporting', text: 'Converting item readings' }))
                else return []
                const cardProperties = await exportSubitemProperties(itemList, exportedPropertyListHandler(selectedReadings))
                return itemData.map((_, i) => [...itemData[i], ...pipePotentials[i], ...potentials[i], ...cardProperties[i]])
            case 'RECTIFIER':
                if (componentMounted.current)
                    dispatch(updateSetting('loader', { visible: true, title: 'Exporting', text: 'Converting item readings' }))
                else return []
                const circuitProperties = await exportSubitemProperties(itemList, exportedPropertyListHandler(selectedCircuits))
                return itemData.map((_, i) => [...itemData[i], ...circuitProperties[i]])
            default:
                return itemData
        }
    }, [componentMounted])

    const exportSurveyHandler = async (settings) => {
        const selectedPotentialTypes = settings.selectedPotentialTypes.map(pt => settings.extraData.potentialTypes[pt])
        const selectedPipelines = settings.selectedPipelines.map(p => settings.extraData.pipelineList[p])
        const referenceId = settings.extraData.referenceCellList[settings.selectedReference].id
        const selectedReadings = settings.selectedReadings.map(i => cardProperties[i])
        const selectedCircuits = settings.selectedCircuitReadings.map(i => circuitProperties[i])
        try {
            const result = await exportHandler(settings.itemType,
                settings.sorting,
                settings.selectedProperties,
                selectedPotentialTypes,
                selectedPipelines,
                referenceId,
                settings.selectedPotentialReadings,
                selectedReadings,
                selectedCircuits)
            dispatch(updateSetting('loader', { visible: true, title: 'Exporting', text: 'Creating CSV file' }))
            const fileName = fileNameGen(surveyName, 'csv')
            if (componentMounted.current) {
                const writeFs = await writeFile(genCsv(result), fileName, 'exports', false)
                if (writeFs.status === 200 && componentMounted.current)
                    dispatch(setExportModal({ visible: true, fileUrl: writeFs.filePath, mimeType: 'text/csv' }))
                else errorHandler(writeFs.status)
            }
        }
        catch (er) {
            errorHandler(624)
        }

        dispatch(updateSetting('loader', { visible: false }))
    }

    useEffect(() => {
        componentMounted.current = true
        return () => componentMounted.current = false
    }, [])


    return (
        <Button
            style={styles.button}
            onPress={exportSurveyHandler.bind(this, settings)}>
            Export
        </Button>
    )
}

export default ExportButton