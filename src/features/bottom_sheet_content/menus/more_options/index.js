import React from 'react'
import { View, StyleSheet } from 'react-native'
import MenuListItem from '../../components/MenuListItem'

const MoreOptionsSheet = (props) => {
    return (
        <View
            style={styles.mainView}>
            <MenuListItem
                title='NFC labels'
                icon='nfc'
                pack='cp'
                onPress={props.navigateToExternalLinkSettings} />
            <MenuListItem
                title='Corrosion calculator'
                icon='calculator'
                pack='cp'
                onPress={props.navigateToCalculatorList} />
            <MenuListItem
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