import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic, basic300, basic400, control, primary } from '../styles/colors'
import { androidRipple } from '../styles/styles'


const ToggleToken = ({ checked, title, onPress, icon, pack }) => {
    const check = checked ? 'checkmark-circle-2' : 'radio-button-off-outline'
    return (
        <Pressable
            android_ripple={androidRipple}
            style={styles.container}
            onPress={onPress}>
            <Icon
                name={check}
                fill={checked ? primary : basic400}
                style={styles.icon} />
            {icon ?
                <Icon
                    name={icon}
                    pack={pack}
                    fill={basic}
                    style={styles.icon} />
                : null}
            <Text
                style={styles.text}
                category='p2'
                ellipsizeMode={'tail'}
                numberOfLines={1}>
                {title}
            </Text>
        </Pressable>
    )
}

export default ToggleToken

const styles = StyleSheet.create({
    container: {
        flex: -1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingRight: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: basic300,
        maxWidth: 200,
        margin: 4,
        elevation: 1,
        backgroundColor: control
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    text: {
        flex: -1
    }
})