import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapSettingButton from './buttons/MapSettingButton'
import SatelliteButton from './buttons/SatelliteButton'
import MyLocationButton from './buttons/MyLocationButton'
import FilterButton from './buttons/FilterButton'
import RefreshButton from './buttons/RefreshButton'
import MapLoading from './MapLoading'

const Buttons = ({ satelliteMode, zoomToUserLocation, toggleSatelliteMode, navigateToViewMapLayer }) => {
    return (
        <View style={styles.controlBar}>
            <MapLoading />
            <View
                style={styles.side1}>
                <FilterButton />
                <RefreshButton />
            </View>
            <View
                style={styles.side2}>
                <View
                    style={styles.sideButtons}>
                    <MyLocationButton
                        zoomToUserLocation={zoomToUserLocation} />
                    <SatelliteButton
                        toggleSatelliteMode={toggleSatelliteMode}
                        satelliteMode={satelliteMode} />
                    <MapSettingButton
                        navigateToViewMapLayer={navigateToViewMapLayer} />
                </View>
            </View>
        </View>
    )
}

export default React.memo(Buttons)

const styles = StyleSheet.create({
    controlBar: {
        top: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        pointerEvents: 'box-none',
        justifyContent: 'center',
        flex: 1,
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    side1: {
        flex: 1,
        pointerEvents: 'box-none',
        flexDirection: 'row',
    },
    side2: {
        flex: -1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        pointerEvents: 'box-none',
    },
    sideButtons: {

    }
})