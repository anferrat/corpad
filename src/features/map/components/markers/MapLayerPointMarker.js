import React from 'react'
import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { getPointIcon } from '../native_icons/mapIcons'

const anchor = {
    x: 0.5,
    y: 0.5
}

const MapLayerPointMarker = ({ active, latitude, longitude, color, onPress, layerId, layerName, index, name }) => {
    const onPressHandler = () => onPress({ layerId, layerName, index, color, latitude, longitude, name })
    if (latitude !== null && longitude !== null)
        return (
            <Marker
                anchor={anchor}
                identifier={`LayerPoint_${layerId}_${index}`}
                image={getPointIcon(true, color)}
                opacity={active ? 0 : 1}
                onPress={onPressHandler}
                tracksViewChanges={false}
                style={styles.marker}
                stopPropagation={true}
                isPreselected={true}
                coordinate={{
                    latitude: latitude,
                    longitude: longitude
                }} />
        )
    else
        return null
}

export default React.memo(MapLayerPointMarker)

const styles = StyleSheet.create({
    marker: {
        zIndex: 1
    }
})