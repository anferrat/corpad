import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import InputField from '../InputField'
import { currentCalculation2 } from '../../../../helpers/functions'
import { useDispatch } from 'react-redux'
import { updateSubitemProperty } from '../../../../store/actions/subitem'
import TargetView from './TargetView'
import CurrentView from './CurrentView'
import ShuntView from './ShuntView'
import { Button } from '@ui-kitten/components'
import { arrowUp, arrowDown } from '../../../../components/Icons'

const CircuitView = (props) => {
    const dispatch = useDispatch()
    const [showCurrentCalculation, setShowCurrentCalculation] = useState(false)
    const resetVoltageDrop = React.useCallback((exec) => {
        if (exec)
            dispatch(updateSubitemProperty(null, 'voltageDrop'))
    }, [dispatch])

    const updateCurrent = React.useCallback((voltageDrop, ratioCurrent, ratioVoltage) => {
        const current = currentCalculation2(voltageDrop, ratioCurrent, ratioVoltage)
        if (current !== null)
            dispatch(updateSubitemProperty(current, 'current', true))
    }, [dispatch])

    const validShuntObject = React.useMemo(() => ({
        ratioVoltage: props.circuitData.valid.ratioVoltage,
        ratioCurrent: props.circuitData.valid.ratioCurrent,
        voltageDrop: props.circuitData.valid.voltageDrop,
    }), [props.circuitData.valid.ratioVoltage, props.circuitData.valid.ratioCurrent, props.circuitData.valid.voltageDrop])
    return (
        <>
            <InputField
                property='name'
                maxLength={40}
                label='Circuit label'
                placeholder={props.circuitData.defaultName}
                value={props.circuitData.name}
                valid={props.circuitData.valid.name} />
            <CurrentView
                current={props.circuitData.current}
                voltage={props.circuitData.voltage}
                currentValid={props.circuitData.valid.current}
                voltageValid={props.circuitData.valid.voltage}
                resetVoltageDrop={resetVoltageDrop.bind(this, props.circuitData.voltageDrop !== null)} />
            <TargetView
                targetMin={props.circuitData.targetMin}
                targetMax={props.circuitData.targetMax}
                targetMinValid={props.circuitData.valid.targetMin}
                targetMaxValid={props.circuitData.valid.targetMax} />
            <Button
                onPress={setShowCurrentCalculation.bind(this, !showCurrentCalculation)}
                accessoryRight={showCurrentCalculation ? arrowUp : arrowDown}
                appearance='ghost'
                style={styles.button}>
                Current calculation
            </Button>
            <View style={{ ...styles.shuntView, display: showCurrentCalculation ? 'flex' : 'none' }}>
                <ShuntView
                    updateCurrent={updateCurrent}
                    ratioVoltage={props.circuitData.ratioVoltage}
                    ratioCurrent={props.circuitData.ratioCurrent}
                    voltageDrop={props.circuitData.voltageDrop}
                    valid={validShuntObject}
                />
            </View>
        </>
    )
}

export default CircuitView

const styles = StyleSheet.create({
    button: {
        margin: -12,
        marginTop: 0,
        heigth: 60,
    },
    shuntView: {
        paddingTop: 12
    }
})