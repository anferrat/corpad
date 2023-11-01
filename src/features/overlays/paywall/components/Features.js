import React from 'react'
import { View, StyleSheet } from 'react-native'
import FeatureListItem from './FeatureListItem'


const Features = () => {
    return (
        <View style={styles.features}>
            <FeatureListItem
                title='Photos'
                icon='camera'
                color='#97EC8F'
                description='Take and assign photos to sites. Share survey files with photos.' />
            <FeatureListItem
                title='Map layers'
                icon='globe-2'
                color='#FFEA70'
                description='Add geodata to your survey from .kml and .gpx files.' />
            <FeatureListItem
                title='Multimeter'
                icon='bluetooth'
                color='#FFAF95'
                description='Connect BLE (Bleutooth Low Energy) multimeter to capture voltage and current.' />
        </View>
    )
}

export default Features

const styles = StyleSheet.create({
    features: {
        marginHorizontal: 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})