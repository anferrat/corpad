import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import ExportKmlButton from './ExportKmlButton'
import SatelliteButton from './SatelliteButton'
import MyLocationButton from './MyLocationButton'
import SearchField from './SearchField'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const OverlayView = (props) => {
    const insets = useSafeAreaInsets()
    return (
        <>
            <SearchField
                insets={insets}
                zoomToTestPoint={props.zoomToTestPoint} />
            <View style={{ ...styles.buttonBar, top: 70 + insets.top }}>
                <MyLocationButton
                    zoomToMyLocation={props.zoomToMyLocation} />
                <SatelliteButton />
                <ExportKmlButton />
            </View>
        </>
    )
}

export default React.memo(OverlayView)

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute',
        width: '100%',
    },
    mainViewFill: StyleSheet.absoluteFill,
    buttonBar: {
        position: 'absolute',
        right: '5%',
        alignSelf: 'flex-end',
        height: 180,
        justifyContent: 'space-between'
    },
})