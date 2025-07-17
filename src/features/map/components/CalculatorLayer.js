import React, { useCallback } from 'react'
import useCalculatorMarkers from '../hooks/useCalculatorMarkers'
import CalculatorMarker from './markers/CalculatorMarker'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveCalculatorMarker } from '../../../store/actions/map'
import ActiveCalculatorMarker from './markers/ActiveCalculatorMarker'


const CalculatorLayer = ({ }) => {
    const { markers } = useCalculatorMarkers()
    const { calculatorId, latitude, longitude } = useSelector(state => state.map.activeCalculatorMarker)
    const dispatch = useDispatch()
    const onPress = useCallback((calculatorId, calculatorType, latitude, longitude, name) => {
        dispatch(setActiveCalculatorMarker(calculatorId, calculatorType, latitude, longitude, name))
    }, [])

    return (
        <>
            {
                markers.map(marker => (
                    <CalculatorMarker
                        key={marker.id}
                        calculatorId={marker.id}
                        active={marker.id === calculatorId}
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        calculatorType={marker.type}
                        name={marker.name}
                        onPress={onPress}
                    />))
            }
            <ActiveCalculatorMarker
                calculatorId={calculatorId}
                latitude={latitude}
                longitude={longitude}
            />
        </>
    )
}


export default CalculatorLayer