import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { Pressable as PressableDefault, View, StyleSheet, Platform } from 'react-native'
import { basic, danger, primary, warning, success, basic400 } from '../../../styles/colors'
import Pressable from '../../../components/Pressable'

const ripple = { color: basic }

const statusColors = {
    danger: danger,
    basic: basic,
    primary: primary,
    success: success,
    warning: warning
}

const ControlButton = ({ onPress, status, icon, label, hidden, disabled }) => {
    if (!hidden)
        return (
            <PressableDefault
                onPress={onPress} style={styles.pressable}>
                <View style={styles.topView}>
                    <View
                        style={styles.elevatedView}>
                        <Pressable
                            style={styles.innerView}
                            android_ripple={ripple}
                            onPress={onPress}>
                            <Icon
                                fill={disabled ? basic : (statusColors[status] ?? primary)}
                                style={styles.icon}
                                name={icon} />
                        </Pressable>
                    </View>
                    <Text
                        appearance={disabled ? 'hint' : 'default'}
                        category='label'
                        style={styles.label}>
                        {label}
                    </Text>
                </View>
            </PressableDefault>
        )
    else return null
}

export default React.memo(ControlButton)

const styles = StyleSheet.create({
    pressable: {
        marginHorizontal: 8,
    },
    topView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50
    },
    innerView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: 45,
        backgroundColor: '#fff'
    },
    icon: {
        width: 30,
        height: 30,
    },
    label: {
        textAlignVertical: "center",
        textAlign: "center",
        fontWeight: 'bold'
    },
    elevatedView: StyleSheet.compose({
        overflow: 'hidden',
        alignItems: 'center',
        borderRadius: 6,
        justifyContent: 'center',
        height: 45,
        width: 45,
        elevation: 5,
        marginBottom: 10,
    }, Platform.select({
        ios: {
            borderWidth: 1,
            borderColor: basic400,
        },
        android: {
            elevation: 5
        },
        default: {
            borderWidth: 1,
            borderColor: basic400,
        }
    }))
})