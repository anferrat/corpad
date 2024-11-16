import React from 'react'
import { StyleSheet, Text } from 'react-native'


const B = ({ children }) => {
    return (
        <Text
            category={'s1'}
            style={styles.text}>
            {children}
        </Text>

    )
}

export default B

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    },
})