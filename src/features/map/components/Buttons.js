import React from 'react'
import { StyleSheet, View } from 'react-native'
import ExportKmlButton from './buttons/ExportKmlButton'
import SatelliteButton from './buttons/SatelliteButton'
import MyLocationButton from './buttons/MyLocationButton'

const Buttons = ({ satelliteMode, zoomToUserLocation, toggleSatelliteMode, loading }) => {
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

export default React.memo(Buttons)

const styles = StyleSheet.create({
    controlBar: {
        top: 24,
        right: '2.5%',
        alignSelf: 'flex-end',
        height: 180,
        justifyContent: 'space-between'
    },
})