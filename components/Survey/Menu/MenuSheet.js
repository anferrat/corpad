import React from 'react'
import { ListItem, Divider } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { exportIcon, settings } from '../../_Stateless/Icons'
import SaveListItem from './SaveListItem'
import UpdateListItem from './UpdateListItem'


const MenuSheet = (props) => {
    return (
        <View style={styles.mainView}>
            <ListItem title='Export to CSV' accessoryLeft={exportIcon} style={styles.listItem} onPress={props.navigateToExport} />
            <UpdateListItem
                closeSheet={props.closeSheet} />
            <SaveListItem
                closeSheet={props.closeSheet} />
            <Divider />
            <ListItem title='Settings' accessoryLeft={settings} onPress={props.navigateToSettings} style={styles.listItem} />
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