import { Icon } from '@ui-kitten/components'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { primary, basic300 } from '../styles/colors'

const SingleIconButton = (props) => {
    const size = props.size === 'small' ? 20 : props.size === 'large' ? 30 : 25
    const iconStyle = props.size === 'small' ? styles.small : props.size === 'large' ? styles.large : styles.medium
    const color = props.color ?? primary
    return (
        <Pressable
            disabled={props.disabled}
            onPress={props.onPress}
            hitSlop={5}
            android_ripple={{
                radius: (size + 15) / 2,
                color: basic300
            }}
            style={{ ...styles.pressable, ...props.style }}>
            <Icon
                pack={props.pack}
                name={props.iconName}
                style={iconStyle}
                fill={color} />
        </Pressable>
    )
}

export default React.memo(SingleIconButton)

const styles = StyleSheet.create({
    large: {
        height: 30,
        width: 30,
        marginHorizontal: 2,
    },
    medium: {
        height: 25,
        width: 25,
        marginHorizontal: 2,
    },
    small:
    {
        height: 20,
        width: 20,
    },
    pressable: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
})