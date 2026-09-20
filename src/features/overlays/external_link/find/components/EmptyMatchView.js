import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import { translateOverlay } from '../../../../../localization'


const EmptyMatchView = () => {
    return (
        <View style={styles.container}>
            <Text
                category='s2'
                appearance='hint'>
                {translateOverlay('externalLink.noMatches')}
            </Text>
        </View>
    )
}

export default EmptyMatchView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24
    },
})
