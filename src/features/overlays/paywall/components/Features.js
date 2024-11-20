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
                description='Import polylines, polygons and markers from geodata files.' />
            <FeatureListItem
                title='Multimeter'
                icon='bluetooth'
                color='#FFAF95'
                description='Connect multimeter over Bleutooth to capture voltage and current.' />
            <FeatureListItem
                title='NFC tags'
                icon='nfc'
                pack='cp'
                color='#9AE2FE'
                description='Write site data to NFC labels with your phone.' />
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