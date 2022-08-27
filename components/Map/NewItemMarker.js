import React from 'react'
import { Marker } from 'react-native-maps'
import { getActiveMapIcon } from './MapIcons'
import { StyleSheet } from 'react-native'

const NewItemMarker = (props) => {
    if (props.latitude !== null && props.longitude !== null)
        return (
            <Marker
                style={styles.marker}
                image={getActiveMapIcon('default')}
                tracksViewChanges={false}
                coordinate={{
                    latitude: props.latitude,
                    longitude: props.longitude
                }} />
        )
    else
        return null
}

export default NewItemMarker

const styles = StyleSheet.create({
    marker: {
        zIndex: 1
    }
})