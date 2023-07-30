import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Text } from '@ui-kitten/components'
import { basic300, primary } from '../../../../styles/colors'


const DefaultBadge = () => (
    <View style={badgeStyle}>
        <Text category='label' status='control' numberOfLines={1} ellipsizeMode={'tail'}>Default name</Text>
    </View>
)

export default DefaultBadge

const styles = StyleSheet.create({
    badge: {
        borderRadius: 10,
        backgroundColor: primary,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    badgePlatformSpecific: Platform.select({
        android: {
            elevation: 5,
        },
        default: {
            borderWidth: 1,
            borderColor: basic300
        }
    }),
})

const badgeStyle = StyleSheet.compose(styles.badge, styles.badgePlatformSpecific)