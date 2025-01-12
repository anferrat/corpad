import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic, basic300, basic400, control, primary } from '../styles/colors'
import { androidRipple } from '../styles/styles'
import Pressable from './Pressable'


const ToggleToken = ({ checked, title, onPress, icon, pack, disabled }) => {
    const check = checked ? 'checkmark-circle-2' : 'radio-button-off-outline'
    return (
        <View style={wrapperStyle}>
            <Pressable
                disabled={disabled}
                android_ripple={androidRipple}
                style={styles.container}
                onPress={onPress}>
                <Icon
                    name={check}
                    fill={checked && !disabled ? primary : basic400}
                    style={styles.icon} />
                {icon ?
                    <Icon
                        name={icon}
                        pack={pack}
                        fill={basic}
                        style={styles.icon} />
                    : null}
                <Text
                    appearance={disabled ? 'hint' : 'default'}
                    style={styles.text}
                    category='s1'
                    ellipsizeMode={'tail'}
                    numberOfLines={1}>
                    {title}
                </Text>
            </Pressable>
        </View >
    )
}

export default React.memo(ToggleToken)

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
        borderRadius: 20,
        marginRight: 12,
        marginVertical: 6
    },
    wrapperPlatformSpecific: Platform.select({
        android: {
            elevation: 2
        },
        default: {
            borderColor: basic300,
            borderWidth: 1
        }
    }),
    container: {
        flex: -1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingRight: 12,
        borderRadius: 20,
        maxWidth: 200,
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

const wrapperStyle = StyleSheet.compose(styles.wrapper, styles.wrapperPlatformSpecific)