import React from 'react'
import { View, StyleSheet } from 'react-native'
import { globalStyle } from '../../../../styles/styles'
import { Text, ListItem } from '@ui-kitten/components'
import { useSelector } from 'react-redux'
import { file } from '../../../../components/Icons'
import IconButton from '../../../../components/IconButton'


const FileData = ({ navigateToSpreadsheet }) => {
    const fileName = useSelector(state => state.importData.fileName)
    const uri = useSelector(state => state.importData.uri)
    const rows = useSelector(state => state.importData.data.length)
    const columns = useSelector(state => state.importData.fields.length)

    const renderIcon = React.useCallback(() => <IconButton
        iconName={'diagonal-arrow-right-up'}
        onPress={navigateToSpreadsheet.bind(this, uri, fileName)}
    />, [])

    return (
        <View style={{ ...globalStyle.card, ...styles.mainView }} >
            <Text category='label' appearance='hint' style={styles.label}>Data file (.csv)</Text>
            <ListItem
                disabled={true}
                accessoryLeft={file}
                accessoryRight={renderIcon}
                title={fileName}
                description={`Rows: ${rows}, Colums: ${columns}`}
                style={styles.listItem} />
        </View>
    )
}

export default FileData


const styles = StyleSheet.create({
    label: {
        paddingLeft: 12,
        paddingBottom: 3
    },
    listItem: {
    },
    mainView: {
        paddingHorizontal: 0,
        marginBottom: 0
    }
})