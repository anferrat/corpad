import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Text } from '@ui-kitten/components'
import { basic, basic300 } from '../../../../styles/colors'


const Badge = (props) => (
    <View style={badgeStyle}>
        <Text category='label' status='control' numberOfLines={1} ellipsizeMode={'tail'}>{props.title}</Text>
    </View>
)

export default Badge

const styles = StyleSheet.create({
    badge: {
        flex: -1,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: basic,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    badgePlatformSpecific: Platform.select({
        android: {
            elevation: 4
        },
        default: {
            borderWidth: 1,
            borderColor: basic300
        }
    }),
})

const badgeStyle = StyleSheet.compose(styles.badge, styles.badgePlatformSpecific)