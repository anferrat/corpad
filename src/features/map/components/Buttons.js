import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapSettingButton from './buttons/MapSettingButton'
import SatelliteButton from './buttons/SatelliteButton'
import MyLocationButton from './buttons/MyLocationButton'

const Buttons = ({ satelliteMode, zoomToUserLocation, toggleSatelliteMode, navigateToViewMapLayer }) => {
    return (
        <View style={styles.controlBar}>
            <MyLocationButton
                zoomToUserLocation={zoomToUserLocation} />
            <SatelliteButton
                toggleSatelliteMode={toggleSatelliteMode}
                satelliteMode={satelliteMode} />
            <MapSettingButton
                navigateToViewMapLayer={navigateToViewMapLayer} />
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