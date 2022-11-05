import React, { useState, useEffect } from 'react';
import { androidStyle } from '../styles/GlobalStyle';
import { View } from 'react-native';
import CalculatorList from '../components/Calculator/CalculatorList';
import LoadingView from '../components/_Stateless/Settings/LoadingView';

export default CalculatorListScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setTimeout(() => setLoading(false), 20)
    }, [])

    const navigateToCalculator = (calculator) => navigation.navigate('Calculator', { calculatorType: calculator })
    return (
        <View style={androidStyle.AndroidSafeArea}>
            <LoadingView loading={loading}>
                <CalculatorList
                    navigateToCalculator={navigateToCalculator} />
            </LoadingView>
        </View>
    )
}