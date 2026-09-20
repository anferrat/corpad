import { Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { translateMapLayer } from '../../../localization'


const EmptyMapLayerListComponent = () => {

    return <View
        style={styles.container}>
        <Text
            style={styles.text}
            category='s2'
            appearance='hint'>
            {translateMapLayer('emptyDescription')}
        </Text>
    </View>
}

export default EmptyMapLayerListComponent

const styles = StyleSheet.create({
    container: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20
    },
    text: {
        padding: 12,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})
