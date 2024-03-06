import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Divider } from '@ui-kitten/components'

const Title = ({ title, hint }) => {
    return (
        <View
            style={styles.container}>
            <View
                style={styles.header}>
                <Text
                    category='h6'
                    style={styles.text}>
                    {title}
                </Text>
            </View>
            <Divider />
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    container: {
        margin: 12,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 6
    },
    text: {
        fontSize: 14,
        marginRight: 6,
        textTransform: 'uppercase'
    }
})