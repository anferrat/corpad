import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@ui-kitten/components'
import fieldValidation from '../../fieldValidation'
import InputDataField from './InputDataField'

const CurrentFourWire = (props) => {
    //Get data from thickness table where 
    const setValue = React.useCallback((property, status, value) => {
        props.setData(old => ({ ...old, calculator: { ...old.calculator, given: { ...old.calculator.given, [property]: status === null ? value : { ...old.calculator.given[property], [status]: value } } } }))
    }, [props.setData])

    const setValid = React.useCallback((property, status, value) => {
        const validation = fieldValidation(value, property, true)
        props.setValid(old => ({ ...old, [property]: status === null ? validation.valid : { ...old[property], [status]: validation.valid } }))
        if (validation.valid)
            setValue(property, status, value)
    }, [props.setValid, setValue])

    return (
        <>
            <InputDataField
                property='current'
                status={null}
                style={styles.inputCurrent}
                disabled={props.disabled}
                setValue={setValue}
                setValid={setValid}
                label='Test current'
                value={props.data.current}
                valid={props.valid.current}
                unit='A'
            />
            <View style={styles.inputRow}>
                <Text appearance='hint' category='label' style={styles.label}>Volatage drop</Text>
                <View style={styles.inputs}>
                    <InputDataField
                        property='voltageDrop'
                        status='off'
                        style={styles.inputLeft}
                        disabled={props.disabled}
                        setValue={setValue}
                        setValid={setValid}
                        value={props.data.voltageDrop.off}
                        valid={props.valid.voltageDrop.off}
                        unit='mV' />
                    <InputDataField
                        property='voltageDrop'
                        status='on'
                        style={styles.inputLeft}
                        disabled={props.disabled}
                        setValue={setValue}
                        setValid={setValid}
                        value={props.data.voltageDrop.on}
                        valid={props.valid.voltageDrop.on}
                        unit='mV' />
                </View>
            </View>
        </>
    )
}

export default CurrentFourWire

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingTop: 16
    },
    inputLeft: {
        flex: 1,
        paddingRight: 6
    },
    inputRight: {
        flex: 1,
        paddingLeft: 6
    },
    divider: {
        marginBottom: 12
    },
    inputCurrent: {
        flex: 1
    },
    inputs: {
        flex: 1
    },
    label: {
        flexBasis: 100,
    },
})