import React from 'react'
import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { activeCalculatorIcon } from '../native_icons/mapIcons'

const offset = {
    x: 0,
    y: -24
}

const ActiveCalculatorMarker = ({ calculatorId, latitude, longitude }) => {
    const visible = latitude !== null && longitude !== null && calculatorId !== null

    if (visible)
        return (
            <Marker
                isPreselected={true}
                image={activeCalculatorIcon}
                key={'ActiveCalculatorMarker'}
                identifier={'ActiveCalculatorMarker'}
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

export default React.memo(ActiveCalculatorMarker)

const styles = StyleSheet.create({
    marker: {
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 40,
        height: 40,
    }
})