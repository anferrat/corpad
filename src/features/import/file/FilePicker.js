import React, { useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Button, ListItem } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux'
import { parseCSV } from '../../../helpers/csv_generator'
import { errorHandler } from '../../../helpers/error_handler'
import { setImportData, resetImportItem } from '../../../store/actions/importData'
import { file, plusCircle } from '../../../components/Icons'
import { control } from '../../../styles/colors'
import { sendCombinedRequest } from '../../../api/database/index'
import { pickFile } from '../../../native_libs/document_picker'
import { readFile } from '../../../api/files/fs'
import IconButton from '../../../components/IconButton'


const FilePicker = ({ navigateToSpreadsheet }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const fileName = useSelector(state => state.importData.fileName)
    const uri = useSelector(state => state.importData.uri)
    const rows = useSelector(state => state.importData.data.length ?? null)
    const columns = useSelector(state => state.importData.fields.length)

    const resetFile = () => {
        dispatch(resetImportItem())
    }

    useEffect(() => () => resetFile(), [])

    const ResetIcon = () => <IconButton
        onPress={resetFile}
        iconName={'close'}
    />

    const selectFile = React.useCallback(async () => {
        setLoading(true)
        const externalFile = await pickFile('csv')
        if (externalFile.status === 200) {
            const fileData = await readFile(externalFile.result.uri)
            if (fileData.status === 200) {
                const databaseRequest = await sendCombinedRequest([
                    ['SELECT', 'DEFAULT_NAMES', {}],
                    ['SELECT', 'POTENTIAL_TYPES', {}],
                    ['SELECT', 'PIPELINE_LIST_DATA', {}],
                    ['SELECT', 'REFERENCE_CELL_LIST', {}],
                    ['SELECT', 'SETTINGS', {}]
                ])
                if (databaseRequest.status === 200) {
                    const data = await parseCSV(fileData.result)
                    if (data.status === 200) {
                        if (data.result.data.length !== 0)
                            if (data.result.meta.fields.length !== 0)
                                dispatch(setImportData(
                                    data.result.meta.fields,
                                    data.result.data,
                                    externalFile.result.name,
                                    databaseRequest.result[0],
                                    externalFile.result.uri,
                                    {
                                        potentialTypes: databaseRequest.result[1],
                                        pipelineList: databaseRequest.result[2],
                                        referenceCellList: databaseRequest.result[3],
                                        autoCreatePotentials: databaseRequest.result[4].autoCreatePotentials
                                    }))
                            else errorHandler(416)
                        else errorHandler(415)
                    }
                    else errorHandler(data.status)
                }
                else errorHandler(databaseRequest.status)
            }
            else errorHandler(fileData.status)
        }
        else if (externalFile.status !== 201)
            errorHandler(externalFile.status)
        setLoading(false)
    }, [dispatch, setLoading])

    if (fileName === null)
        return (
            <Button
                style={styles.button}
                onPress={selectFile}
                accessoryLeft={loading ?
                    <ActivityIndicator color={control} /> :
                    plusCircle}
                disabled={loading}>
                Select file
            </Button>
        )
    else return (
        <ListItem
            title={fileName}
            onPress={navigateToSpreadsheet.bind(this, uri, fileName)}
            description={`Rows: ${rows}, Columns: ${columns}`}
            accessoryLeft={file}
            accessoryRight={ResetIcon} />
    )
}

export default FilePicker

const styles = StyleSheet.create({
    button: {
        margin: 12,
    }

})