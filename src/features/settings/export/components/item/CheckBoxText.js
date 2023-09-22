import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'


const CheckBoxText = ({ children }) => {
    return (
        <Text
            category='p1'
            style={styles.text}>{children}</Text>
    )
}

export default CheckBoxText

const styles = StyleSheet.create({
    text: {
        paddingLeft: 12
    },
})