import React from 'react'
import { View, StyleSheet } from 'react-native'
import MenuListItem from '../../components/MenuListItem'
import { translateBottomSheet } from '../../../../localization'

const MoreOptionsSheet = (props) => {
    return (
        <View
            style={styles.mainView}>
            <MenuListItem
                title={translateBottomSheet('qrNfcLabels')}
                icon='nfc'
                pack='cp'
                onPress={props.navigateToExternalLinkSettings} />
            <MenuListItem
                title={translateBottomSheet('corrosionCalculator')}
                icon='calculator'
                pack='cp'
                onPress={props.navigateToCalculatorList} />
            <MenuListItem
                title={translateBottomSheet('exportedFiles')}
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
