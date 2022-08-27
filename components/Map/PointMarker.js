import React from 'react'
import { Marker } from 'react-native-maps'
import { iconHandlerItem } from '../customFunctions'
import { getMapIcon } from './MapIcons'

const anchor = {
    x: 0.5,
    y: 0.5
}

const PointMarker = (props) => {
    const coordinate = React.useMemo(() => ({
        latitude: props.latitude,
        longitude: props.longitude
    }), [props.latitude, props.longitude])

    const bindItem = React.useMemo(() => ({
        id: props.id,
        dataType: props.dataType,
        uid: props.uid,
        status: props.status,
        name: props.name,
        testPointType: props.testPointType,
        latitude: props.latitude,
        longitude: props.longitude,
        location: props.location
    }), [props.uid, props.status, props.latitude, props.longitude, props.location, props.testPointType, props.name, props.id])

    const onDragEnd = React.useCallback((e) => props.onDragEnd(e, bindItem, false), [bindItem])

    if (props.latitude !== null && props.longitude !== null && props.name !== null)
        return (
            <Marker
                anchor={anchor}
                draggable
                identifier={`${props.dataType}_${props.id}`}
                image={getMapIcon(iconHandlerItem(props.dataType, props.testPointType), props.status)}
                opacity={props.active ? 0 : 1}
                onPress={props.onPress.bind(this, bindItem)}
                onDragStart={props.onDragStart}
                onDragEnd={onDragEnd}
                tracksViewChanges={false}
                coordinate={coordinate} />
        )
    else
        return null
}

export default React.memo(PointMarker)