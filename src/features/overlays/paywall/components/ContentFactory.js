import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SubscriptionStatuses } from '../../../../constants/global'
import Message from './Message'
import Features from './Features'
import StatusMessage from './StatusMessage'


const ContentFactory = ({ status, expirationTime }) => {
    switch (status) {
        case SubscriptionStatuses.GRANTED:
        case SubscriptionStatuses.UNKNOWN_GRANTED:
            return <>
                <StatusMessage
                    expirationTime={expirationTime} />
                <Message
                    message='Thank you for subscribing! Your contribution directly fuels the development of new features and improvements to make this app even better.'
                />
            </>
        case SubscriptionStatuses.UNKNOWN_NOT_GRANTED:
            return <Message
                message="You have been offline for a while. To confirm your subscription status and gain acces to premium features, simply press the button below while connected to the internet." />
        case SubscriptionStatuses.PENDING:
            return <Message
                message="We are currently obtaining your subcription status. It should take less than a minute." />
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