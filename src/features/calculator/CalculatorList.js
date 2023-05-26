import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import ListItem from './components/ListItemSettings'
import { CalculatorTypes } from '../../constants/global'
import { CalculatorTypeIconPacks, CalculatorTypeIcons } from '../../constants/icons'
import { CalculatorTypeDescriptionLabels, CalculatorTypeLabels } from '../../constants/labels'

export const calculatorParams = [
    {
        title: 'Current',
        calculators: [CalculatorTypes.SHUNT, CalculatorTypes.CURRENT_TWO_WIRE, CalculatorTypes.CURRENT_FOUR_WIRE]
    },
    {
        title: 'Soil',
        calculators: [CalculatorTypes.WENNER]
    },
    {
        title: 'Coating',
        calculators: [CalculatorTypes.COATING]
    },
    {
        title: 'Other',
        calculators: [CalculatorTypes.REFERENCE_CELL]
    },
]

const CalculatorList = (props) => {
    return (
        <ScrollView
            style={styles.mainView}
            contentContainerStyle={styles.container}>
            {calculatorParams.map(section => (
                <React.Fragment
                    key={section.title}>
                    <Text
                        style={styles.title}
                        appearance='hint'>
                        {section.title}
                    </Text>
                    {section.calculators.map(calculator =>
                        <ListItem
                            pack={CalculatorTypeIconPacks[calculator]}
                            iconName={CalculatorTypeIcons[calculator]}
                            key={calculator}
                            title={CalculatorTypeLabels[calculator]}
                            subtitle={CalculatorTypeDescriptionLabels[calculator]}
                            onPress={props.navigateToCalculator.bind(this, calculator)} />)}
                </React.Fragment>
            ))}
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