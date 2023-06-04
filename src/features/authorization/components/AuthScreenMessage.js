import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { primary } from '../../../styles/colors'

const AuthScreenMessage = () => {
    return (
        <View
            style={styles.mainView}>
            <Icon
                name='cloud'
                pack='cp'
                style={styles.icon}
                fill={primary} />
            <Text
                category={'p1'}
                appearance='hint'
                style={styles.text}>
                Signing in with cloud storage allows you to store your survey files securely and to make them available on different devices.
            </Text>
        </View>
    )
}

export default React.memo(AuthScreenMessage, () => true)

const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 48,
        paddingHorizontal: 24
    },
    icon: {
        width: 100,
        height: 100
    },
    text: {
        textAlign: 'center'
    }
})