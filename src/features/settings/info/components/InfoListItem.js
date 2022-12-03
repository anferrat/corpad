import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic } from '../../../../styles/colors'
import { androidRipple } from '../../../../styles/styles'

const InfoListItem = (props) => {
    return (
        <Pressable style={styles.mainView} android_ripple={androidRipple}>
            <View style={styles.leftSide}>
                <Icon name={props.icon} pack={props.pack} style={styles.icon} fill={basic} />
                <View style={styles.titleView}>
                    <Text category='p1'>{props.title}</Text>
                    <Text category='s2' appearance='hint'>{props.subtitle}</Text>
                </View>
            </View>
            <Text category='p1' style={styles.valueText} numberOfLines={1} ellipsizeMode='middle'>{props.value}</Text>

        </Pressable>
    )
}

export default InfoListItem

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 24
    },
    leftSide: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightSide: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'red'
    },
    titleView: {
        justifyContent: 'center'
    },
    valueText: {
        fontWeight: 'bold',
        textAlign: 'right',
        textAlignVertical: 'center',
        flex: 1,
        marginLeft: 18
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 12
    }
})