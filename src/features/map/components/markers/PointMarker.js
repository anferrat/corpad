import React from 'react'
import { Marker } from 'react-native-maps'
import { getMapIcon } from '../native_icons/mapIcons'

const anchor = {
    x: 0.5,
    y: 0.5
}

const PointMarker = ({ uid, id, name, onPress, updateMarkerHandler, onDragStart, active, latitude, longitude, status, markerType, itemType, location, comment, timeModified, timeCreated, testPointType }) => {
    const marker = { uid, id, name, latitude, longitude, status, markerType, itemType, location, comment, timeModified, timeCreated, testPointType }
    const onPressHandler = () => onPress(marker)

    const onDragEnd = ({ nativeEvent: { coordinate: { latitude, longitude } } }) => {
        updateMarkerHandler(marker, latitude, longitude)
    }

    if (latitude !== null && longitude !== null && name !== null)
        return (
            <Marker
                anchor={anchor}
                draggable
                identifier={`${itemType}_${id}`}
                image={getMapIcon(markerType, status)}
                opacity={active ? 0 : 1}
                onPress={onPressHandler}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                tracksViewChanges={false}
                //isPreselected={true}
                coordinate={{
                    latitude: latitude,
                    longitude: longitude
                }} />
        )
    else
        return null
}

export default React.memo(PointMarker)