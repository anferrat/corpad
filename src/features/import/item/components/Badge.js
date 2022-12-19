import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { basic, primary } from '../../../../styles/colors'


const Badge = (props) => (
    <View style={styles.badge}>
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
        elevation: 5
    },
})