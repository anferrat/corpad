import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text } from '@ui-kitten/components'
import { primary } from '../../../styles/colors'
import { translateOverlay } from '../../../localization'

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
                {translateOverlay('session.cloudStorageDescription')}
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
