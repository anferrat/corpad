import { Text, Divider } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'


const Title = ({ name }) => {
    return (
        <View style={styles.container}>
            <Text
                category='h6'
                style={styles.text}>
                {name}
            </Text>
            <Divider />
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    container: {
        marginBottom: 12
    },
    text: {
        fontSize: 14,
        marginBottom: 6
    }
})