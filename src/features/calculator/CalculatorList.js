import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import ListItem from './components/ListItemSettings'
import { calculatorTypes } from '../../constants/constants'

export const calculatorParams = [
    {
        title: 'Current',
        calculators: ['shunt', 'current2Wire', 'current4Wire']
    },
    {
        title: 'Soil',
        calculators: ['wenner']
    },
    {
        title: 'Coating',
        calculators: ['coating']
    },
    {
        title: 'Other',
        calculators: ['refCell']
    },
]

const CalculatorList = (props) => {
    return (
        <ScrollView style={styles.mainView} contentContainerStyle={styles.container}>
            {calculatorParams.map(section => (
                <React.Fragment key={section.title}>
                    <Text style={styles.title} appearance='hint'>{section.title}</Text>
                    {section.calculators.map(calculator =>
                        <ListItem
                            pack={calculatorTypes[calculator].pack}
                            iconName={calculatorTypes[calculator].icon}
                            key={calculator}
                            title={calculatorTypes[calculator].title}
                            subtitle={calculatorTypes[calculator].description}
                            onPress={props.navigateToCalculator.bind(this, calculator)} />)}
                </React.Fragment>))}
        </ScrollView>
    )
}

export default CalculatorList

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#fff'
    },
    container: {
        paddingVertical: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 12,
        paddingVertical: 6
    }
})