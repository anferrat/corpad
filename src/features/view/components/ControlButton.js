import React from 'react'
import { Text, Icon } from '@ui-kitten/components'
import { Pressable, View, StyleSheet } from 'react-native'
import { basic, basic200, danger, primary, warning, success } from '../../../styles/colors'

const ripple = { color: basic }

const statusColors = {
    danger: danger,
    basic: basic,
    primary: primary,
    success: success,
    warning: warning
}

const ControlButton = ({ onPress, status, icon, label, hidden }) => {
    if (!hidden)
        return (
            <Pressable
                onPress={onPress} style={styles.pressable}>
                <View style={styles.topView}>
                    <View
                        style={styles.elevatedView}>
                        <Pressable
                            style={styles.innerView}
                            android_ripple={ripple}
                            onPress={onPress}>
                            <Icon fill={statusColors[status] ?? primary} style={styles.icon} name={icon} />
                        </Pressable>
                    </View>
                    <Text
                        category='label'
                        style={styles.label}>{label}</Text>
                </View>
            </Pressable >
        )
    else return null
}

export default React.memo(ControlButton)

const styles = StyleSheet.create({
    pressable: {
        marginHorizontal: 6,
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
    elevatedView: {
        overflow: 'hidden',
        alignItems: 'center',
        borderRadius: 6,
        justifyContent: 'center',
        borderColor: basic,
        backgroundColor: basic200,
        height: 45,
        width: 45,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 10,
    }
})