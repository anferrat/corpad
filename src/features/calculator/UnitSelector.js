import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Toggle, Text } from '@ui-kitten/components'


const UnitSelector = (props) => {
    if (props.calculatorType !== 'wenner' && props.calculatorType !== 'current2Wire' && props.calculatorType !== 'coating')
        return <View />
    else
        return (
            <View style={styles.toggleView}>
                <Toggle checked={!props.isMetric} onChange={props.setIsMetric} disabled={props.disabled} />
                <Text category='s2' appearance='hint' style={styles.text}>Imperial units</Text>
            </View>)
}

export default UnitSelector

const styles = StyleSheet.create({
    toggleView: {
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 12
    }
})