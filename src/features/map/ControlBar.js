import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from './components/SearchBar'
import Buttons from './components/Buttons'

const ControlBar = ({ setMarkerActive, resetActiveMarker, satelliteMode, toggleSatelliteMode, zoomToUserLocation, animateToCoordinates, navigateToViewMapLayer }) => {
    return (
        <SafeAreaView
            pointerEvents={'box-none'}
            style={styles.container}
            edges={['top']}>
            <SearchBar
                satelliteMode={satelliteMode}
                setMarkerActive={setMarkerActive}
                resetActiveMarker={resetActiveMarker} />
            <Buttons
                satelliteMode={satelliteMode}
                toggleSatelliteMode={toggleSatelliteMode}
                navigateToViewMapLayer={navigateToViewMapLayer}
                zoomToUserLocation={zoomToUserLocation}
                animateToCoordinates={animateToCoordinates} />
        </SafeAreaView>
    )
}

export default ControlBar

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        flex: 1
    }
})