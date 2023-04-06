import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import SingleIconButton from '../../../components/IconButton'
import WireParams from './WireParams.js'
import { basic } from '../../../styles/colors'

const Header = ({ icon, title, wireColor, wireGauge, onEdit }) => {

    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <Icon
                    pack='cp'
                    name={icon}
                    style={styles.titleIcon}
                    fill={basic} />
                <Text
                    appearance='hint'
                    category='p1'
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>{title}</Text>
                <SingleIconButton
                    size='small'
                    iconName='edit'
                    onPress={onEdit} />
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