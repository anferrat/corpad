import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SubscriptionStatuses } from '../../../../constants/global'
import Message from './Message'
import Features from './Features'
import StatusMessage from './StatusMessage'
import { translateOverlay } from '../../../../localization'


const ContentFactory = ({ status, expirationTime }) => {
    switch (status) {
        case SubscriptionStatuses.GRANTED:
        case SubscriptionStatuses.UNKNOWN_GRANTED:
            return <>
                <StatusMessage
                    expirationTime={expirationTime} />
                <Message
                    message={translateOverlay('paywall.thankYou')}
                />
            </>
        case SubscriptionStatuses.UNKNOWN_NOT_GRANTED:
            return <Message
                message={translateOverlay('paywall.offline')} />
        case SubscriptionStatuses.PENDING:
            return <Message
                message={translateOverlay('paywall.pending')} />
        default:
            return <Features />
    }
}

export default ContentFactory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
