import { Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { getFormattedDate } from '../../../../helpers/functions'


const StatusMessage = ({ expirationTime }) => {
    if (expirationTime)
        return (
            <Text
                style={styles.text}
                category='s2'
                appearance='hint'>
                Subcription is active.{`\n`} Next renewal: {getFormattedDate(expirationTime)}
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