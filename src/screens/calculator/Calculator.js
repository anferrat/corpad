import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { globalStyle } from '../../styles/styles'
import LoaderCalculator from '../../features/calculator/LoaderCalculator'
import LoadingView from '../../components/LoadingView'

export default CalculatorScreen = ({ navigation, route }) => {
    const { calculatorType } = route.params
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 20)
    }, [])

    return (
        <SafeAreaView style={globalStyle.screen}>
            <LoadingView loading={loading}>
                <LoaderCalculator
                    calculatorType={calculatorType} />
            </LoadingView>
        </SafeAreaView>
    )
}