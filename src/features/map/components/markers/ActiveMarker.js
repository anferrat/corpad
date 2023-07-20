import React from 'react'
import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { getActiveMapIcon } from '../native_icons/mapIcons'

const offset = {
    x: 0,
    y: -24
}

const ActiveMarker = ({ itemType, markerType, id, uid, location, timeModified, timeCreated, status, latitude, longitude, name, comment, onDragStart, updateMarkerHandler }) => {
    const marker = { uid, id, name, latitude, longitude, status, markerType, itemType, location, comment, timeModified, timeCreated }
    const visible = latitude !== null && longitude !== null

    const onDragEnd = ({ nativeEvent: { coordinate: { latitude, longitude } } }) =>
        updateMarkerHandler(marker, latitude, longitude)
    if (visible)
        return (
            <Marker
                isPreselected={true}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
                draggable
                image={getActiveMapIcon(markerType)}
                key={'ActiveMarker'}
                identifier={'ActiveMarker'}
                tracksViewChanges={false}
                centerOffset={offset}
                coordinate={{
                    latitude: latitude,
                    longitude: longitude
                }}
                style={styles.marker} />
        )
    else return null

}

export default React.memo(ActiveMarker)

const styles = StyleSheet.create({
    marker: {
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 40,
        height: 40,
    }
})