import { Button, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Pressable from '../../../../components/Pressable'
import { androidRipple } from '../../../../styles/styles'
import { translateOverlay } from '../../../../localization'

const RestoreView = ({ onRestore, disabled }) => {
    return (
        <View style={styles.container}>
            <Text
                category='s2'
                appearance='hint'>{translateOverlay('paywall.alreadySubscribed')} </Text>
            <Pressable
                disabled={disabled}
                android_ripple={androidRipple}
                onPress={onRestore}>
                <Text
                    status='primary'
                    category='s2'
                    style={styles.button}>
                    {translateOverlay('paywall.restorePurchases')}
                </Text>
            </Pressable>
        </View>
    )
}

export default RestoreView

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12
    },
    button: {
        textDecorationLine: 'underline'
    }
})
