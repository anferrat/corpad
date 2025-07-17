import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyle } from '../../styles/styles'
import LoaderCalculator from '../../features/calculator/LoaderCalculator'
import LoadingView from '../../components/LoadingView'

export default CalculatorScreen = ({ navigation, route }) => {
    const { calculatorType, calculatorId } = route.params
    return (
        <SafeAreaView style={globalStyle.screen}>
            <LoaderCalculator
                calculatorId={calculatorId}
                calculatorType={calculatorType} />
        </SafeAreaView>
    )
}