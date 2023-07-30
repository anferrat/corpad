
import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { basic, basic200, basic300, control, primary, success } from '../../../styles/colors'
import { androidRipple } from '../../../styles/styles'
import Pressable from '../../../components/Pressable'

const OptionCard = ({ onPress, disabled, icon, pack, selected, hint, subtitle, title }) => {

    return (
        <Pressable
            style={selected ? mainViewSelectedStyle : mainViewStyle}
            android_ripple={androidRipple}
            onPress={onPress}
            disabled={disabled}>
            <View
                style={styles.topRow}>
                {selected ?
                    <Icon
                        name={'checkmark-circle-2'}
                        style={styles.checkIcon}
                        fill={success} />
                    : null}
            </View>
            <Icon
                name={icon}
                pack={pack}
                style={styles.icon}
                fill={selected ? primary : basic} />
            <Text
                category={'h6'}
                appearance={disabled ? 'hint' : 'default'}>
                {title}
            </Text>
            {hint ?
                <Text
                    appearance={'hint'}
                    category='s2'>
                    {hint}
                </Text>
                : null}
            <Text
                category={'s2'}
                appearance='hint'
                style={styles.subtitle}>
                {subtitle}
            </Text>
        </Pressable>
    )
}

export default React.memo(OptionCard)

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginHorizontal: 8,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: control
    },
    mainViewPlatformSpecific: Platform.select({
        android: {
            elevation: 5
        },
        default: {
            borderWidth: 1,
            borderColor: basic300
        }
    }),
    mainViewSelected: {
        backgroundColor: basic200
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 6
    },
    checkIcon: {
        width: 20,
        height: 20
    },
    topRow: {
        width: '100%',
        position: 'absolute',
        top: 6,
        right: 6,
        alignItems: 'flex-end'
    },
    subtitle: {
        marginTop: 12,
        textAlign: 'center'
    }
})

const mainViewStyle = StyleSheet.compose(styles.mainView, styles.mainViewPlatformSpecific)

const mainViewSelectedStyle = StyleSheet.compose(mainViewStyle, styles.mainViewSelected)