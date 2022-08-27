import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import SingleIconButton from '../SingleIconButton.js'
import WireParams from './WireParams.js'
import { basic } from '../../../styles/GlobalStyle.js'
import { View, StyleSheet } from 'react-native'

const Header = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <Icon pack='cp' name={props.icon} style={styles.titleIcon} fill={basic} />
                    <Text appearance='hint' category='p1' style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
                    <SingleIconButton
                        size='small'
                        iconName='edit'
                        onPress={props.onPressEdit} />
            </View>
            <WireParams
                wireColor={props.wireColor}
                wireGauge={props.wireGauge} />
        </View>
    )
}

export default React.memo(Header)

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 12
    },
    titleIcon: {
        height: 23,
        width: 23
    },
    title: {
        flexShrink: 1,
        marginHorizontal: 6
    }
})