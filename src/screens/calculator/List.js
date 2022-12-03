import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { globalStyle } from '../../styles/styles'
import CalculatorList from '../../features/calculator/CalculatorList'
import LoadingView from '../../components/LoadingView'

export default CalculatorListScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setTimeout(() => setLoading(false), 20)
    }, [])

    const navigateToCalculator = (calculator) => navigation.navigate('Calculator', { calculatorType: calculator })
    return (
        <View style={globalStyle.screen}>
            <LoadingView loading={loading}>
                <CalculatorList
                    navigateToCalculator={navigateToCalculator} />
            </LoadingView>
        </View>
    )
}