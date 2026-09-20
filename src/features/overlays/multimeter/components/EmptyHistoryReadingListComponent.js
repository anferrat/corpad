import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text } from '@ui-kitten/components'
import { translateMultimeterOverlay } from '../../../../localization'


const EmptyHistoryReadingListComponent = () => {
    return (
        <View
            style={styles.container}>
            <Text
                appearance='hint'
                category='p1'>{translateMultimeterOverlay('noSavedReadings')}
            </Text>
        </View>
    )
}


export default EmptyHistoryReadingListComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Dimensions.get('screen').height / 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
