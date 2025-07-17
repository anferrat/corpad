import React from 'react'
import { StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { calculatorIcon } from '../native_icons/mapIcons'

const anchor = {
    x: 0.5,
    y: 0.5
}

const CalculatorMarker = ({ active, latitude, longitude, onPress, calculatorId, calculatorType, name }) => {
    const onPressHandler = () => onPress(calculatorId, calculatorType, latitude, longitude, name)
    if (latitude !== null && longitude !== null)
        return (
            <Marker
                anchor={anchor}
                identifier={`CalculatorMaker_${calculatorId}`}
                image={calculatorIcon}
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

export default React.memo(CalculatorMarker)

const styles = StyleSheet.create({
    marker: {
        zIndex: 1
    }
})