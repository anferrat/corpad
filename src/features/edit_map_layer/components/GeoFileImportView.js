import { Button, ListItem, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { file, plusCircle } from '../../../components/Icons'
import { getFileSize } from '../../../helpers/functions'

const GeoFileImportView = ({ filename, size, onSelectFile }) => {
    if (filename) {
        const { value, unit } = getFileSize(size)
        return (
            <>
                <Text category='label' appearance='hint'>Importing file</Text>
                <View style={styles.container}>
                    <ListItem
                        style={styles.listItem}
                        accessoryLeft={file}
                        title={filename}
                        description={`${value} ${unit}`}
                        disabled={true}
                    />
                </View>
            </>
        )
    }
    else
        return (
            <>
                <Text category='label' appearance='hint'>Importing file</Text>
                <View style={styles.buttonView}>
                    <Button
                        onPress={onSelectFile}
                        style={styles.button}
                        accessoryLeft={plusCircle}>
                        Select file
                    </Button>
                    <Text
                        category='label'
                        appearance='hint'>
                        File size limit: 3MB
                    </Text>
                </View>
            </>
        )
}

export default GeoFileImportView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItem: {
        flex: 1
    },
    tokens: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttonView: {
        minHeight: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 150,
        marginBottom: 12
    },
})