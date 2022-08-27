import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { Marker } from 'react-native-maps'
import { getActiveMapIcon } from './MapIcons'
import { iconHandlerItem } from '../customFunctions'


const ActiveMarker = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.latitude !== null && props.longitude !== null)
            props.zoomToTestPoint(props.latitude, props.longitude)
    }, [props])

    const onDragEnd = React.useCallback((e) => {
        props.onDragEnd(e, {
            dataType: props.dataType,
            id: props.id,
            uid: props.uid,
            status: props.status,
            latitude: props.latitude,
            longitude: props.longitude,
            testPointType: props.testPointType,
            name: props.name,
            location: props.location
        }, true)
    }, [props])

    return (
        <Marker
            onDragEnd={onDragEnd}
            onDragStart={props.onDragStart}
            draggable
            image={getActiveMapIcon(iconHandlerItem(props.dataType, props.testPointType))}
            key={'ActiveMarker'}
            opacity={props.latitude !== null && props.longitude !== null ? 1 : 0}
            identifier={'ActiveMarker'}
            tracksViewChanges={false}
            coordinate={{
                latitude: props.latitude === null ? -1 : props.latitude,
                longitude: props.longitude === null ? -1 : props.longitude
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
    },
    markerHidden: {
        display: 'none'
    }
})