import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { StyleSheet, Pressable, View } from 'react-native'
import { basic, primary } from '../../../styles/colors'
import { androidRipple } from '../../../styles/styles'

const ListItemSearch = (props) => {
    return (
        <Pressable
            android_ripple={androidRipple}
            style={styles.pressable}
            onPress={props.onPress}>
            <View style={styles.mainView}>
                <Icon name={props.icon} pack='cp' style={styles.icon} fill={basic} />
                <View style={styles.titleView}>
                    <Text category='p1'>{props.title}</Text>
                    <Text category='s2' appearance='hint'>{props.subtitle}</Text>
                </View>
            </View>
            <Icon name='diagonal-arrow-right-up-outline' style={styles.arrow} fill={primary} />
        </Pressable>
    )
}

export default ListItemSearch

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
        paddingHorizontal: 14,
    },
    mainView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleView: {
        justifyContent: 'center',
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 10
    },
    arrow: {
        height: 20,
        width: 20,
        marginRight: 16
    }
})