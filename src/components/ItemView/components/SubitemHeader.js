import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import WireParams from '../../WireParams'
import { basic300, primary } from '../../../styles/colors'
import { SubitemTypeIcons } from '../../../constants/icons'

const Header = ({ name, subitemType, wireColor, wireGauge }) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <Icon
                    pack='cp'
                    name={SubitemTypeIcons[subitemType]}
                    style={styles.titleIcon}
                    fill={primary} />
                <Text
                    category='p1'
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>{name}</Text>
            </View>
            <WireParams
                wireColor={wireColor}
                wireGauge={wireGauge} />
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
        backgroundColor: basic300
    },
    titleView: {
        flex: -1,
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 12,

        padding: 12,
        borderRadius: 15
    },
    titleIcon: {
        height: 24,
        width: 24,
        marginRight: 4
    },
    title: {
        flexShrink: 1,
        marginHorizontal: 6,
        fontSize: 16,
        fontWeight: 'bold'
    }
})