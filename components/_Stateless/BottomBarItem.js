import React from 'react'
import { Icon, Text } from '@ui-kitten/components'
import { Pressable, StyleSheet } from 'react-native'
import { basic, primary, primary100 } from '../../styles/GlobalStyle'

const BottomBarItem = (props) => {
    return (
        <Pressable style={styles.pressable} android_ripple={{ color: primary100 }} onPress={props.onPress}>
            <Icon name={props.icon} pack={props.pack} fill={props.focused ? primary : basic} style={props.focused ? styles.iconFocused : styles.icon} />
            <Text category='label' style={props.focused ? styles.titleFocused : styles.title}>{props.title}</Text>
        </Pressable>
    )
}

export default BottomBarItem

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6
    },
    iconFocused: {
        width: 22,
        height: 22,
    },
    titleFocused: {
        color: primary,
        fontWeight: '200'
    },
    icon: {
        width: 20,
        height: 20,
    },
    title: {
        color: basic,
        fontWeight: '200'
    }
})