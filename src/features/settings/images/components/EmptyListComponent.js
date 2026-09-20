import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { translateSettings } from '../../../../localization'


const EmptyListComponent = () => {
    return (
        <View
            style={styles.container}>
            <Text
                appearance='hint'>
                {translateSettings('noImages')}
            </Text>
        </View>
    )
}

export default EmptyListComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24,
    },
})
