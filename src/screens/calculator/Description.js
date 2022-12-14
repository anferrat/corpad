import React from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyle } from '../../styles/styles'
import { CalculatorInfo } from '../../features/calculator'


export default CalculatorScreen = ({ route }) => {
    const { calculatorType } = route.params

    return (
        <SafeAreaView style={globalStyle.screen}>
            <CalculatorInfo calculatorType={calculatorType} />
        </SafeAreaView>
    )
}