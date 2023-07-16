import { Icon, Text, Toggle } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { primary } from '../../../../styles/colors'

const OnOffCaptureToggle = ({ onOffCaptureActive, onOffCaptureToggleHandler }) => {

    const onPress = () => onOffCaptureToggleHandler(!onOffCaptureActive)
    return (
        <Pressable
            onPress={onPress}
            style={styles.container}>
            <View style={styles.label}>
                <Icon
                    style={styles.icon}
                    name='activity'
                    fill={primary} />
                <Text
                    numberOfLines={1}
                    style={styles.text}
                    status='primary'>
                    Capture ON/OFF cycle
                </Text>
            </View>
            <Toggle
                style={styles.toggle}
                status='primary'
                checked={onOffCaptureActive}
                onChange={onOffCaptureToggleHandler} />
        </Pressable>
    )
}

export default React.memo(OnOffCaptureToggle)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 60,
        paddingHorizontal: 24,
    },
    text: {
        flex: 1
    },
    label: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 12
    },
    toggle: {
        marginLeft: 24
    }
})