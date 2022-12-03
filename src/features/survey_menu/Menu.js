import React from 'react'
import { Divider } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import SaveListItem from './SaveListItem'
import UpdateListItem from './UpdateListItem'
import ListItem from './components/ListItemMenu'


const MenuSheet = (props) => {
    return (
        <View style={styles.mainView}>
            <ListItem title='Corrosion calculator' icon='calculator' pack='cp' onPress={props.navigateToCalculatorList} />
            <ListItem title='Export survey' icon='download-outline' onPress={props.navigateToExport} />
            <UpdateListItem
                closeSheet={props.closeSheet} />
            <SaveListItem
                closeSheet={props.closeSheet} />
            <Divider />
            <ListItem title='Settings' icon='settings-outline' onPress={props.navigateToSettings} />
        </View>
    )
}

export default React.memo(MenuSheet)

export const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#fff',
    },
    listItem: {
        flex: 1,
        flexBasis: 70,
        alignItems: 'center'
    },
    hidden: {
        display: 'none'
    }
})