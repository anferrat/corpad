import { Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'


const Message = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {message}
            </Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        lineHeight: 24
    }
})