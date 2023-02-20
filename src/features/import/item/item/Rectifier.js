import React from 'react'
import { View, StyleSheet } from 'react-native'
import Parameter from '../Parameter'
import RectifierSetting from './RectifierSetting'

const RectifierView = () => {
    return (
        <>
            <Parameter
                property='name' />
            <Parameter
                property='status' />
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
                property='model' />
            <Parameter
                property='serialNumber' />
            <Parameter
                property='powerSource' />
            <View style={styles.location}>
                <Parameter
                    style={styles.locationField}
                    property='maxVoltage' />
                <Parameter
                    style={styles.locationField}
                    property='maxCurrent' />
            </View>
            <RectifierSetting />
            <Parameter
                property='comment' />
        </>
    )
}

export default RectifierView

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

