import React from 'react'
import { StyleSheet, View } from 'react-native'
import WennerCalculator from './wenner/WennerCalculator'
import ShuntConverter from './shunt/ShuntConverter'
import CurrentTwoWire from './current_two_wire/CurrentTwoWire'
import CurrentFourWire from './current_four_wire/CurrentFourWire'
import CoatingResistivity from './coating/CoatingResistivity'
import ReferenceConverter from './reference_cell/ReferenceConverter'
import { globalStyle } from '../../styles/styles'


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
    return <View style={styles.maiView}>
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