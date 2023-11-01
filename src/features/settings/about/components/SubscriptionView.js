import { Button, Divider, Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SubscriptionStatusColors } from '../../../../styles/colors'
import { SubscriptionStatusIcons } from '../../../../constants/icons'
import { SubscriptionStatusLabels } from '../../../../constants/labels'
import { getFormattedDate, isProStatus, isVerifyStatus } from '../../../../helpers/functions'
import useAbout from '../hooks/useAbout'


const SubscriptionView = () => {
    const { status, expirationTime, onShowPaywall } = useAbout()
    const isPro = isProStatus(status)
    const isVerify = isVerifyStatus(status)
    return (
        <View style={styles.container}>
            <Text
                style={styles.label}
                category='label'
                appearance='hint'>
                Subscription
            </Text>
            <Divider />
            <View style={styles.row}>
                <View
                    style={styles.title}>
                    <Icon
                        name={SubscriptionStatusIcons[status]}
                        style={styles.icon}
                        fill={SubscriptionStatusColors[status]}
                    />
                    <Text
                        style={styles.text}>
                        {SubscriptionStatusLabels[status]}
                    </Text>
                </View>
                {isPro ? <View>
                    <Text
                        category='c2' appearance='hint'>
                        Expires
                    </Text>
                    <Text
                        category='s2'>
                       {getFormattedDate(expirationTime)}
                    </Text>
                </View>

                    :
                    <Button
                        onPress={onShowPaywall}
                        appearance='ghost'
                        size='small'>
                        {isVerify ? 'Check' : 'Upgrade'}
                    </Button>}
            </View>
            {isPro ?
                <Text
                    style={styles.hint}
                    category='c2'
                    appearance='hint'>
                    To unsubscribe please go to "Manage subscriptions" tab in your app store settings.
                </Text> : null}
        </View>
    )
}

export default SubscriptionView

const styles = StyleSheet.create({
    container: {
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 12
    },
    row: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        flexDirection: 'row'
    },
    text: {
        fontWeight: 'bold'
    },
    label: {
        paddingLeft: 12,
        paddingBottom: 4
    },
    hint: {
        paddingTop: 0,
        paddingHorizontal: 12,
        paddingBottom: 12
    }
})