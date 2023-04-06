import React from 'react'
import { StyleSheet, View } from 'react-native'
import ExportKmlButton from './buttons/ExportKmlButton'
import SatelliteButton from './buttons/SatelliteButton'
import MyLocationButton from './buttons/MyLocationButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ControlBar = ({ satelliteMode, zoomToUserLocation, toggleSatelliteMode, loading }) => {
    const insets = useSafeAreaInsets()
    return (
        <View style={{ ...styles.controlBar, top: 70 + insets.top }}>
            <MyLocationButton
                zoomToUserLocation={zoomToUserLocation} />
            <SatelliteButton
                toggleSatelliteMode={toggleSatelliteMode}
                satelliteMode={satelliteMode} />
            <ExportKmlButton
                loading={loading} />
        </View>

    )
}

export default React.memo(ControlBar)

const styles = StyleSheet.create({
    controlBar: {
        position: 'absolute',
        right: '5%',
        alignSelf: 'flex-end',
        height: 180,
        justifyContent: 'space-between'
    },
})