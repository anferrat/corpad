import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'


const ExportHint = () => {
    return (
        <View style={styles.container}>
            <Text
                category='s2'
                appearance='hint'
                style={styles.text}>
                Looking for .kml export? Check 'Export survey' in settings.
            </Text>
        </View>
    )
}

export default ExportHint

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 36,
        textAlign: 'center',
        paddingBottom: 12,
        marginTop: 12
    },
    text: {
        textAlign: 'center'
    }
})