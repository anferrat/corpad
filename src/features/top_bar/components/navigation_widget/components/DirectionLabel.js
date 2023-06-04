import React from 'react'
import {  StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'


const DirectionLabel = ({ value }) => {
    return (
            <Text
                style={styles.value}
                catgory={'p1'}>
                {value}
            </Text>
    )
}

export default DirectionLabel

const styles = StyleSheet.create({
    value: {
        marginBottom: 12,
        marginTop:6,
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})