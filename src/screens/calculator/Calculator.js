import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyle } from '../../styles/styles'
import LoaderCalculator from '../../features/calculator/LoaderCalculator'
import LoadingView from '../../components/LoadingView'

export default CalculatorScreen = ({ navigation, route }) => {
    const { calculatorType, calculatorId } = route.params
    const navigateToMap = () => navigation.navigate('PipelineSurvey', { screen: 'Map' })
    return (
        <SafeAreaView style={globalStyle.screen} edges={['left', 'right', 'bottom']}>
            <LoaderCalculator
                calculatorId={calculatorId}
                calculatorType={calculatorType}
                navigateToMap={navigateToMap} />
        </SafeAreaView>
    )
}
