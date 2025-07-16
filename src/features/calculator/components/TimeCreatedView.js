import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { getFullDate } from '../../../helpers/functions'


const TimeCreatedView = ({ timeCreated, disabled }) => {
    if (timeCreated == null || !disabled)
        return null
    return (
        <View
            style={styles.container}>
            <Text category='label' appearance='hint'>Created</Text>
            <Text category='s2' appearance='hint'>{getFullDate(timeCreated)}</Text>
        </View>
    )
}


export default TimeCreatedView

const styles = StyleSheet.create({
    container: {
        paddingBottom: 12
    },
})