import React from 'react'
import WennerCalculator from './Wenner/WennerCalculator'
import ShuntConverter from './Shunt/ShuntConverter'
import CurrentTwoWire from './CurrentTwoWire/CurrentTwoWire'
import CurrentFourWire from './CurrentFourWire/CurrentFourWire'
import { View } from 'react-native'
import { androidStyle } from '../../styles/GlobalStyle'
import CoatingResistivity from './Coating/CoatingResistivity'
import ReferenceConverter from './RefCell/ReferenceConverter'
import { StyleSheet } from 'react-native'

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
        ...androidStyle.ConnectionCard,
        marginTop: 0
    }
})