import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Button, ListItem } from '@ui-kitten/components'
import { file, plusCircle } from '../../../components/Icons'
import { control } from '../../../styles/colors'
import IconButton from '../../../components/IconButton'
import useImportFile from './hooks/useImportFile'
import { translateImport } from '../../../localization'

const FilePicker = ({ navigateToSpreadsheet }) => {
    const { selectFile, resetFile, fileName, path, rows, columns, loading } = useImportFile()

    const ResetIcon = () => <IconButton
        onPress={resetFile}
        iconName={'close'} />

    if (fileName === null)
        return (
            <>
                <Button
                    appearance='outline'
                    style={styles.button}
                    onPress={selectFile}
                    accessoryLeft={loading ?
                        <ActivityIndicator color={control} /> :
                        plusCircle}
                    disabled={loading}>
                    {translateImport('file.selectFile')}
                </Button>
            </>
        )
    else return (
        <ListItem
            title={fileName}
            onPress={navigateToSpreadsheet.bind(this, path, fileName)}
            description={translateImport('file.rowsColumns', { rows, columns })}
            accessoryLeft={file}
            accessoryRight={ResetIcon} />
    )
}

export default FilePicker

const styles = StyleSheet.create({
    button: {
        margin: 24,
    }

})
