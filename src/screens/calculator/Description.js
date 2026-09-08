import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyle } from '../../styles/styles'
import { CalculatorInfo } from '../../features/calculator'


export default CalculatorScreen = ({ route }) => {
    const { calculatorType } = route.params

    return (
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right', 'bottom']}>
            <CalculatorInfo calculatorType={calculatorType} />
        </SafeAreaView>
    )
}
