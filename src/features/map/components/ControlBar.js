import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import ExportKmlButton from './buttons/ExportKmlButton'
import SatelliteButton from './buttons/SatelliteButton'
import MyLocationButton from './buttons/MyLocationButton'

const ControlBar = ({ satelliteMode, zoomToUserLocation, toggleSatelliteMode, loading }) => {
    return (
        <View style={styles.controlBar}>
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
        top: 70 + StatusBar.currentHeight,
        position: 'absolute',
        right: '5%',
        alignSelf: 'flex-end',
        height: 180,
        justifyContent: 'space-between'
    },
})