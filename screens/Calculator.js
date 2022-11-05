import React, { useState, useEffect } from 'react'
import { androidStyle } from '../styles/GlobalStyle'
import { SafeAreaView, InteractionManager } from 'react-native'
import LoaderCalculator from '../components/Calculator/LoaderCalculator'
import LoadingView from '../components/_Stateless/Settings/LoadingView'

export default CalculatorScreen = ({ navigation, route }) => {
    const { calculatorType } = route.params
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 20)
    }, [])

    return (
        <SafeAreaView style={androidStyle.AndroidSafeArea}>
            <LoadingView loading={loading}>
                <LoaderCalculator
                    calculatorType={calculatorType} />
            </LoadingView>
        </SafeAreaView>
    )
}