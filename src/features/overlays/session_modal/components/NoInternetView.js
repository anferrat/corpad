import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Text, } from '@ui-kitten/components'
import { basic400 } from '../../../../styles/colors'
import { translateOverlay } from '../../../../localization'

const NoInternetView = () => {
    return (
        <>
            <Icon
                style={styles.icon}
                fill={basic400}
                name='wifi-off' />
            <Text
                style={styles.text}>
                {translateOverlay('session.noInternet')}
            </Text>
        </>
    )
}

export default NoInternetView

const styles = StyleSheet.create({
    icon: {
        width: 100,
        height: 100,
        marginTop: 12
    },
    text: {
        padding: 12,
        textAlign: 'center'
    }
})
