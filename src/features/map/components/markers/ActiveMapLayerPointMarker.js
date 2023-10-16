import React from 'react'
import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { activePointIcon } from '../native_icons/mapIcons'

const offset = {
    x: 0,
    y: -24
}

const ActiveMapLayerPointMarker = ({ layerId, color, latitude, longitude }) => {
    const visible = latitude !== null && longitude !== null && layerId !== null

    if (visible)
        return (
            <Marker
                isPreselected={true}
                image={activePointIcon}
                key={'ActivePointMarker'}
                identifier={'ActivePointMarker'}
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

export default React.memo(ActiveMapLayerPointMarker)

const styles = StyleSheet.create({
    marker: {
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 40,
        height: 40,
    }
})