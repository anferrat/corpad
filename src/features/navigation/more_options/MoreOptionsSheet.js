import React from 'react'
import { View, StyleSheet } from 'react-native'
import ListItem from './components/ListItemMenu'

const MoreOptionsSheet = (props) => {
    return (
        <View
            style={styles.mainView}>
            <ListItem
                title='NFC labels'
                icon='nfc'
                pack='cp'
                onPress={props.navigateToExternalLinkSettings} />
            <ListItem
                title='Corrosion calculator'
                icon='calculator'
                pack='cp'
                onPress={props.navigateToCalculatorList} />
            <ListItem
                title='Exported files'
                icon='file-text-outline'
                onPress={props.navigateToExportedFiles} />
        </View>
    )
}

export default React.memo(MoreOptionsSheet)

export const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#fff',
    }
})