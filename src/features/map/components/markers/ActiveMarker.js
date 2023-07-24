import React from 'react'
import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { getActiveMapIcon } from '../native_icons/mapIcons'


const ActiveMarker = ({ itemType, markerType, id, uid, location, timeModified, timeCreated, status, latitude, longitude, name, comment, testPointType, onDragStart, updateMarkerHandler }) => {
    const marker = { uid, id, name, latitude, longitude, status, markerType, itemType, location, comment, timeModified, timeCreated, testPointType }
    const visible = latitude !== null && longitude !== null

    const onDragEnd = ({ nativeEvent: { coordinate: { latitude, longitude } } }) =>
        updateMarkerHandler(marker, latitude, longitude)

    return (
        <Marker
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            draggable
            image={getActiveMapIcon(markerType)}
            key={'ActiveMarker'}
            opacity={visible ? 1 : 0}
            identifier={'ActiveMarker'}
            tracksViewChanges={false}
            coordinate={{
                latitude: !visible ? -1 : latitude,
                longitude: !visible ? -1 : longitude
            }}
            style={styles.marker} />
    )

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