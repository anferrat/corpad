import React from 'react'
import { View, StyleSheet } from 'react-native'
import Parameter from '../Parameter'

const TestPointView = () => {
    return (
        <>
            <Parameter
                property='name' />
            <Parameter
                property='status' />
            <Parameter
                property='testPointType' />
            <View style={styles.location}>
                <Parameter
                    style={styles.locationField}
                    property='latitude' />
                <Parameter
                    style={styles.locationField}
                    property='longitude' />
            </View>
            <Parameter
                property='location' />
            <Parameter
                property='comment' />
        </>
    )
}

export default TestPointView

const styles = StyleSheet.create({
    location: {
        flexDirection: 'row',
        marginHorizontal: -6,
    },
    locationField: {
        flex: 1,
        marginHorizontal: 6,
    },

})

