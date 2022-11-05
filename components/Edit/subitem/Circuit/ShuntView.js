import React from 'react'
import { View, StyleSheet } from 'react-native'
import InputField from '../InputField'
import { Text } from '@ui-kitten/components'


const ShuntView = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.subView}>
                <Text appearance='hint' category='label' style={styles.label}>Shunt ratio</Text>
                <InputField
                    style={styles.field}
                    keyboardType='numeric'
                    property='ratioCurrent'
                    maxLength={5}
                    calculations={props.updateCurrent.bind(this, props.voltageDrop, props.ratioCurrent, props.ratioVoltage)}
                    value={props.ratioCurrent}
                    valid={props.valid.ratioCurrent}
                    unit='A' />
                <Text style={styles.dash}>-</Text>
                <InputField
                    style={styles.field}
                    keyboardType='numeric'
                    property='ratioVoltage'
                    maxLength={5}
                    calculations={props.updateCurrent.bind(this, props.voltageDrop, props.ratioCurrent, props.ratioVoltage)}
                    value={props.ratioVoltage}
                    valid={props.valid.ratioVoltage}
                    unit='mV' />
            </View>
            <View style={styles.subView}>
                <Text appearance='hint' category='label' style={styles.label}>Voltage drop</Text>
                <InputField
                    style={styles.field}
                    keyboardType='numeric'
                    property='voltageDrop'
                    maxLength={10}
                    calculations={props.updateCurrent.bind(this, props.voltageDrop, props.ratioCurrent, props.ratioVoltage)}
                    value={props.voltageDrop}
                    valid={props.valid.voltageDrop}
                    unit='mV' />
            </View>
        </View>
    )
}

export default React.memo(ShuntView)

const styles = StyleSheet.create({
    mainView: {
        marginTop: 12
    },
    field: {
        flex: 1
    },
    subView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        flexBasis: 90,
        textAlignVertical: 'center',
        height: '100%',
        paddingBottom: 12
    },
    dash: {
        flex: .3,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
        paddingBottom: 12,
    }
})