import { Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { translateMapLayerMarker } from '../../../localization'


const Labels = () => {
    return (
        <View
            style={styles.row}>
            <View
                style={styles.container}>
                <Text
                    category='label'
                    appearance='hint'>{translateMapLayerMarker('property')}</Text>
            </View>
            <View
                style={styles.container_value}>
                <Text
                    category='label'
                    appearance='hint'
                >{translateMapLayerMarker('value')}</Text>
            </View>
        </View>
    )
}

export default Labels

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 12,
    },
    container_value: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 12,
    },
})
