import { Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { getFormattedDate } from '../../../../helpers/functions'
import { translateOverlay } from '../../../../localization'


const StatusMessage = ({ expirationTime }) => {
    if (expirationTime)
        return (
            <Text
                style={styles.text}
                category='s2'
                appearance='hint'>
                {translateOverlay('paywall.subscriptionActive')}{`\n`} {translateOverlay('paywall.nextRenewal', { date: getFormattedDate(expirationTime) })}
            </Text>
        )
    else return null
}

export default StatusMessage

const styles = StyleSheet.create({
    text: {
        flex: 0.2,
        textAlignVertical: 'center',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 20
    },
})
