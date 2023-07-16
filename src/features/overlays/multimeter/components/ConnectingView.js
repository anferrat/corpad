import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { primary } from '../../../../styles/colors'
import { Text } from '@ui-kitten/components'


const ConnectingView = ({ connecting }) => {
    if (connecting)
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    color={primary}
                    size='large' />
                <Text
                    style={styles.text}
                    status='primary'>
                    Connecting
                </Text>
            </View>
        )
    else return null
}

export default React.memo(ConnectingView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        paddingTop: 24
    }
})