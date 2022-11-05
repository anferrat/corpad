import React, { useMemo, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import fieldValidation from '../../fieldValidation'
import { thicknessTable, npsList, pipeSchedules } from '../../../constants/thicknessTable'
import InputDataField from './InputDataField'
import SelectDataField from './SelectDataField'

const CurrentTwoWire = (props) => {
    //Get data from thickness table where 
    const scheduleList = useMemo(() => props.data.npsIndex === null ? [] : pipeSchedules.filter((_, i) => thicknessTable[props.data.npsIndex][i] !== null), [props.data.npsIndex])
    const setValue = React.useCallback((property, value) => {
        props.setData(old => ({ ...old, calculator: { ...old.calculator, given: { ...old.calculator.given, [property]: value } } }))
    }, [props.setData])

    const setValid = React.useCallback((property, value) => {
        const validation = fieldValidation(value, property, true)
        props.setValid(old => ({ ...old, [property]: validation.valid }))
        if (validation.valid)
            setValue(property, validation.value)
    }, [props.setValid, setValue])

    const selectAction = React.useCallback((property, value) => {
        setValue(property, value)
        props.setValid(old => ({ ...old, [property]: value !== null }))
    }, [props.setValid, setValue])

    useEffect(() => {
        if (scheduleList.length > 0) {
            const stdIndex = scheduleList.findIndex(sch => sch === 'STD')
            setValue('scheduleIndex', stdIndex)
            props.setValid(old => ({ ...old, scheduleIndex: true }))
        }
    }, [scheduleList])

    return (
        <>
            <View style={styles.selectRow}>
                <SelectDataField
                    disabled={props.disabled}
                    valid={props.valid.npsIndex}
                    label={'Pipe diameter'}
                    placeholder={'Select diameter'}
                    property={'npsIndex'}
                    style={styles.inputLeft}
                    selectedItem={props.data.npsIndex}
                    itemsList={npsList}
                    selectAction={selectAction}
                />
                <SelectDataField
                    disabled={props.disabled || !props.valid.npsIndex || scheduleList.length === 0}
                    label={'Pipe schedule'}
                    placeholder={'Select schedule'}
                    property={'scheduleIndex'}
                    style={styles.inputRight}
                    selectedItem={props.data.scheduleIndex}
                    itemsList={scheduleList}
                    valid={props.valid.scheduleIndex}
                    selectAction={selectAction}
                />
            </View>
            <View style={styles.inputRow}>
                <InputDataField
                    style={styles.inputLeft}
                    disabled={props.disabled}
                    property={'voltageDrop'}
                    setValue={setValue}
                    setValid={setValid}
                    label='Voltage drop'
                    value={props.data.voltageDrop}
                    valid={props.valid.voltageDrop}
                    unit='mV'
                />
                <InputDataField
                    style={styles.inputRight}
                    disabled={props.disabled}
                    setValue={setValue}
                    setValid={setValid}
                    property={'distance'}
                    label='Segment length'
                    value={props.data.distance}
                    valid={props.valid.distance}
                    unit={props.isMetric ? 'm' : 'ft'}
                />
            </View>
        </>
    )
}

export default CurrentTwoWire

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingTop: 16
    },
    selectRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingBottom: 16
    },
    inputLeft: {
        flex: 1,
        paddingRight: 6
    },
    inputRight: {
        flex: 1,
        paddingLeft: 6
    }
})