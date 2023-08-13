import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { currentCalculation2 } from '../../../../../helpers/functions'
import CircuitTargetView from '../CircuitTargetView'
import CircuitView from '../CircuitView'
import CircuitShuntView from '../CircuitShuntView'
import { Button } from '@ui-kitten/components'
import { arrowUp, arrowDown } from '../../../../../components/Icons'
import NameInput from '../NameInput'

const CT = ({ data, update, validate }) => {
    const [expanded, setExpanded] = useState(false)

    const { valid, ratioVoltage, ratioCurrent, voltageDrop, targetMin, targetMax, name, defaultName, current, voltage } = data

    const validShuntObject = React.useMemo(() => ({
        ratioVoltage: valid.ratioVoltage,
        ratioCurrent: valid.ratioCurrent,
        voltageDrop: valid.voltageDrop,
    }), [valid.ratioVoltage, valid.ratioCurrent, valid.voltageDrop])

    const toggleExpanded = React.useCallback(() => setExpanded(old => !old), [])

    const resetVoltageDrop = React.useCallback(() => {
        if (voltageDrop !== null)
            update(null, 'voltageDrop')
    }, [update, voltageDrop !== null])

    const validateShuntProperty = React.useCallback((property) => {
        validate(property)
        const current = currentCalculation2(voltageDrop, ratioCurrent, ratioVoltage)
        if (current !== null)
            update(current, 'current')
    }, [update, ratioCurrent, ratioVoltage, voltageDrop, validate])

    return (
        <>
            <NameInput
                name={name}
                valid={valid.name}
                defaultName={defaultName}
                update={update}
                validate={validate} />
            <CircuitView
                update={update}
                validate={validate}
                current={current}
                voltage={voltage}
                currentValid={valid.current}
                voltageValid={valid.voltage}
                resetVoltageDrop={resetVoltageDrop} />
            <CircuitTargetView
                update={update}
                validate={validate}
                targetMin={targetMin}
                targetMax={targetMax}
                targetMinValid={valid.targetMin}
                targetMaxValid={valid.targetMax} />
            <Button
                onPress={toggleExpanded}
                accessoryRight={expanded ? arrowUp : arrowDown}
                appearance='ghost'
                style={styles.button}>
                Current calculation
            </Button>
            <View style={{ ...styles.shuntView, display: expanded ? 'flex' : 'none' }}>
                <CircuitShuntView
                    update={update}
                    validateShuntProperty={validateShuntProperty}
                    ratioVoltage={ratioVoltage}
                    ratioCurrent={ratioCurrent}
                    voltageDrop={voltageDrop}
                    valid={validShuntObject} />
            </View>
        </>
    )
}

export default CT

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