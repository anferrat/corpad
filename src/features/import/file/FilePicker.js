import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Button, ListItem } from '@ui-kitten/components'
import { file, plusCircle } from '../../../components/Icons'
import { control } from '../../../styles/colors'
import IconButton from '../../../components/IconButton'
import useImportFile from './hooks/useImportFile'

const FilePicker = ({ navigateToSpreadsheet }) => {
    const { selectFile, resetFile, fileName, path, rows, columns, loading } = useImportFile()

    const ResetIcon = () => <IconButton
        onPress={resetFile}
        iconName={'close'} />

    if (fileName === null)
        return (
            <>
                <Button
                    style={styles.button}
                    onPress={selectFile}
                    accessoryLeft={loading ?
                        <ActivityIndicator color={control} /> :
                        plusCircle}
                    disabled={loading}>
                    Select file
                </Button>
            </>
        )
    else return (
        <ListItem
            title={fileName}
            onPress={navigateToSpreadsheet.bind(this, path, fileName)}
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