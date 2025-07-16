import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import WennerCalculator from './wenner/WennerCalculator'
import ShuntConverter from './shunt/ShuntConverter'
import CurrentTwoWire from './current_two_wire/CurrentTwoWire'
import CurrentFourWire from './current_four_wire/CurrentFourWire'
import CoatingResistivity from './coating/CoatingResistivity'
import ReferenceConverter from './reference_cell/ReferenceConverter'
import { globalStyle } from '../../styles/styles'
import LocationView from './components/LocationView'
import TimeCreatedView from './components/TimeCreatedView'


const MyComponent = (props) => {
    switch (props.calculatorType) {
        case 'shunt':
            return <ShuntConverter {...props} />
        case 'current2Wire':
            return <CurrentTwoWire {...props} />
        case 'current4Wire':
            return <CurrentFourWire {...props} />
        case 'wenner':
            return <WennerCalculator {...props} />
        case 'coating':
            return <CoatingResistivity {...props} />
        case 'refCell':
            return <ReferenceConverter {...props} />
        default:
            return null
    }
}

const CalculatorComponent = (props) => {
    const setCalculatorData = useCallback((data) => props.setData(old => ({ ...old, calculator: { ...old.calculator, ...data } })), [props.setData])
    return <View style={styles.maiView}>
        <TimeCreatedView
            timeCreated={props.timeCreated}
            disabled={props.disabled}
        />
        <LocationView
            disabled={props.disabled}
            setCalculatorData={setCalculatorData}
            setCoordValid={props.setCoordValid}
            latitude={props.latitude}
            longitude={props.longitude}
            latitudeValid={props.coordValid.latitude}
            longitudeValid={props.coordValid.longitude} />
        <MyComponent {...props} />
    </View>
}

export default React.memo(CalculatorComponent)

const styles = StyleSheet.create({
    maiView: {
        ...globalStyle.card,
        marginTop: 0
    }
})