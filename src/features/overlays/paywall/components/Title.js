import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { SubscriptionStatuses } from '../../../../constants/global'
import { translateOverlay } from '../../../../localization'


const renderTitle = (status) => {
    switch (status) {
        case SubscriptionStatuses.GRANTED:
        case SubscriptionStatuses.UNKNOWN_GRANTED:
            return translateOverlay('paywall.allSet')
        case SubscriptionStatuses.UNKNOWN_NOT_GRANTED:
            return translateOverlay('paywall.welcomeBack')
        default:
            return translateOverlay('paywall.upgrade')
    }
}

const Title = ({ status }) => {
    return (
        <Text
            style={styles.title}
            category='h4'>{renderTitle(status)}</Text>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        marginHorizontal: 12,
        textAlign: 'center'
    }
})
