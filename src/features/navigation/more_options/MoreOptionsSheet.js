import React from 'react'
import { View, StyleSheet } from 'react-native'
import ListItem from './components/ListItemMenu'
import useMoreOptions from './hooks/useMoreOptions'
import { success } from '../../../styles/colors'

const MoreOptionsSheet = (props) => {
    const { isPro, isVerify, onPaywallShow } = useMoreOptions(props.closeSheet)
    return (
        <View
            style={styles.mainView}>
            {isPro || isVerify ?
                <ListItem
                    title='Multimeter'
                    icon='radio'
                    onPress={props.navigateToMultimeter} /> :
                <ListItem
                    title='Upgrade to premium'
                    icon='pricetags'
                    status='primary'
                    iconColor={success}
                    onPress={onPaywallShow} />}
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