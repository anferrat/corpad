import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Wallet, Umbrella, Mountain } from '../../../../../assets/paywall'
import { SubscriptionStatuses } from '../../../../constants/global'
import { size } from '../helpers/dimensions'


const IconFactory = (props) => {
    switch (props.status) {
        case SubscriptionStatuses.GRANTED:
        case SubscriptionStatuses.UNKNOWN_GRANTED:
            return <Umbrella {...props} />
        case SubscriptionStatuses.UNKNOWN_NOT_GRANTED:
            return <Mountain {...props} />
        default:
            return <Wallet {...props} />
    }
}

const IconView = ({ status }) => {
    return (
        <View style={styles.container}>
            <IconFactory
                status={status}
                style={styles.paywall} />
        </View>
    )
}

export default IconView

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 36,
        marginBottom: 12
    },
    paywall: {
        width: size,
        height: size
    }
})