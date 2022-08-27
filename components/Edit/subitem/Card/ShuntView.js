import React from 'react'
import { Radio, Text, Layout } from '@ui-kitten/components'
import { useDispatch } from 'react-redux'
import { updateSubitemProperty } from '../../../../store/actions/subitem'
import InputField from '../InputField'
import { currentCalculation, factorCalculation } from '../../../customFunctions'
import { basic, basic1000 } from '../../../../styles/GlobalStyle'

const ShuntView = (props) => {
    const dispatch = useDispatch()

    const changeInput = React.useCallback((isFactorSelected) => {
        dispatch(updateSubitemProperty(!isFactorSelected, 'factorSelected'))
    }, [dispatch])

    const updateFactorAndCurrent = React.useCallback((ratioVoltage, ratioCurrent, voltageDrop) => {
        const factor = factorCalculation(ratioVoltage, ratioCurrent)
        dispatch(updateSubitemProperty(factor, 'factor'))
        dispatch(updateSubitemProperty(false, 'factorSelected'))
        dispatch(updateSubitemProperty(currentCalculation(voltageDrop, factor), 'current'))
    }, [dispatch])

    const setFactorCalculations = React.useCallback((voltage, factor) => {
        updateCurrent(voltage, factor)
        dispatch(updateSubitemProperty(true, 'factorSelected'))
    }, [dispatch])

    const updateCurrent = React.useCallback((voltageDrop, factor) => {
        dispatch(updateSubitemProperty(currentCalculation(voltageDrop, factor), 'current'))
    }, [dispatch])


    const resetRatio = React.useCallback((voltage, current) => {
        if (voltage !== '' || current !== '')
            dispatch(updateSubitemProperty('', 'ratioVoltage'))
        dispatch(updateSubitemProperty('', 'ratioCurrent'))
    }, [dispatch])


    const disabledStyle = React.useCallback((disabled) => disabled ? { fontWeight: 'normal', color: basic } : { fontWeight: 'bold', color: basic1000 }, [])

    //yeah, this gotta be re-done, my eyes are bleeding

    return (
        <Layout>
            <Layout style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 6 }}>
                <Layout style={{ flexBasis: 80, justifyContent: 'center', paddingBottom: 6 }}>
                    <Radio checked={!props.factorSelected}
                        onChange={changeInput.bind(this, props.factorSelected)}>
                        <Text appearance={!props.factorSelected ? 'default' : 'hint'}>Ratio</Text>
                    </Radio>
                </Layout>
                <Layout style={{ flex: 1 }}>
                    <InputField
                        value={props.ratioVoltage}
                        maxLength={4}
                        valid={props.valid.ratioVoltage}
                        property='ratioVoltage'
                        keyboardType='numeric'
                        unit='mV'
                        calculations={updateFactorAndCurrent.bind(this, props.ratioVoltage, props.ratioCurrent, props.voltageDrop)} />
                </Layout>
                <Layout style={{ flexBasis: 20 }}>
                    <Text style={{ marginHorizontal: 8, paddingTop: 10 }} category="p1">-</Text>
                </Layout>
                <Layout style={{ flex: 1 }}>
                    <InputField
                        value={props.ratioCurrent}
                        maxLength={4}
                        valid={props.valid.ratioCurrent}
                        property='ratioCurrent'
                        keyboardType='numeric'
                        calculations={updateFactorAndCurrent.bind(this, props.ratioVoltage, props.ratioCurrent, props.voltageDrop)}
                        unit='A' />
                </Layout>
            </Layout>
            <Layout style={{ flexDirection: 'row', paddingBottom: 6 }}>
                <Layout style={{ flexBasis: 80, justifyContent: 'center', paddingBottom: 6 }}>
                    <Radio checked={!!props.factorSelected}
                        onChange={changeInput.bind(this, props.factorSelected)}>
                        <Text appearance={props.factorSelected ? 'default' : 'hint'}>Factor</Text>
                    </Radio>
                </Layout>
                <Layout style={{ flex: 1 }}>
                    <InputField
                        value={props.factor}
                        maxLength={8}
                        keyboardType='numeric'
                        onChange={() => resetRatio(props.ratioVoltage, props.ratioCurrent)}
                        valid={props.valid.factor}
                        property='factor'
                        calculations={setFactorCalculations.bind(this, props.voltageDrop, props.factor)}
                        unit='A/mV' />
                </Layout>
            </Layout>
            <Layout style={{ flexDirection: 'row' }}>
                <Layout style={{ flex: 1, paddingRight: 6 }}>
                    <InputField
                        calculations={updateCurrent.bind(this, props.voltageDrop, props.factor)}
                        value={props.voltageDrop}
                        maxLength={8}
                        keyboardType='numeric'
                        valid={props.valid.voltageDrop}
                        property='voltageDrop'
                        unit='mV'
                        label='Voltage drop' />
                </Layout>
                <Layout style={{ flex: 1, paddingLeft: 6 }}>
                    <InputField
                        placeholder='No data'
                        disabled={true}
                        value={props.current}
                        valid={true}
                        property='current'
                        unit='A'
                        label='Current' />
                </Layout>
            </Layout>
        </Layout >
    )
}

export default React.memo(ShuntView)