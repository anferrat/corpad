import React from 'react'
import { View, StyleSheet } from 'react-native'
import { primary } from '../../../styles/GlobalStyle'
import { Icon } from '@ui-kitten/components'
import fieldValidation from '../../fieldValidation'
import InputDataField from './InputDataField'
import ButtonDataSelector from './ButtonDataSelector'

const ShuntConverter = (props) => {
    const setValue = React.useCallback((property, value) => {
        props.setData(old => ({ ...old, calculator: { ...old.calculator, given: { ...old.calculator.given, [property]: value } } }))
    }, [props.setData])

    const setValid = React.useCallback((property, value) => {
        const validation = fieldValidation(value, property, true)
        props.setValid(old => ({ ...old, [property]: validation.valid }))
        if (validation.valid)
            setValue(property, validation.value)
    }, [props.setValid, setValue])

    return (
        <>
            <ButtonDataSelector
                disabled={props.disabled}
                selectedIndex={props.data.factorSelected}
                setValue={setValue}
            />
            <View style={styles.ratio}>
                {props.data.factorSelected ? <>
                    <InputDataField
                        disabled={props.disabled}
                        property='factor'
                        valid={props.valid.factor}
                        setValue={setValue}
                        setValid={setValid}
                        label='Factor'
                        style={styles.ratioInput}
                        value={props.data.factor}
                        unit={'A/mV'}
                    />
                </> : <>
                    <InputDataField
                        disabled={props.disabled}
                        setValue={setValue}
                        setValid={setValid}
                        label='Current ratio'
                        property='ratioCurrent'
                        style={styles.ratioInput}
                        value={props.data.ratioCurrent}
                        valid={props.valid.ratioCurrent}
                        unit={'A'} />
                    <Icon style={styles.minus} name='minus' fill={primary} />
                    <InputDataField
                        disabled={props.disabled}
                        property='ratioVoltage'
                        setValue={setValue}
                        setValid={setValid}
                        label='Voltage ratio'
                        style={styles.ratioInput}
                        value={props.data.ratioVoltage}
                        valid={props.valid.ratioVoltage}
                        unit={'mV'}
                    />
                </>}
            </View>
            <InputDataField
                disabled={props.disabled}
                property={'voltageDrop'}
                setValue={setValue}
                setValid={setValid}
                label='Voltage drop'
                value={props.data.voltageDrop}
                valid={props.valid.voltageDrop}
                unit='mV'
            />
        </>
    )
}

export default ShuntConverter

const styles = StyleSheet.create({
    ratio: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingTop: 16
    },
    minus: {
        width: 20,
        height: 20,
        marginTop: 8,
        marginHorizontal: 8
    },
    ratioInput: {
        flex: 1
    }
})