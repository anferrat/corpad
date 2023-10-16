import React from 'react'
import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { addMarker } from '../native_icons/mapIcons'

const offset = {
    x: 0,
    y: -24
}


const NewItemMarker = ({ latitude, longitude }) => {
    if (latitude !== null && longitude !== null)
        return (
            <Marker
                style={styles.marker}
                image={addMarker}
                tracksViewChanges={false}
                centerOffset={offset}
                coordinate={{
                    latitude: latitude,
                    longitude: longitude
                }} />
        )
    else
        return null
}

export default NewItemMarker

const styles = StyleSheet.create({
    marker: {
        zIndex: 2
    }
})