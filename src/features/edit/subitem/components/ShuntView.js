import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Radio, Text } from '@ui-kitten/components'
import Input from '../../../../components/Input'


const ShuntView = ({ update, updateRatioHandler, validateRatioHandler, updateFactorHandler, validateFactorHandler, validateVoltageDropHandler, ratioVoltage, ratioCurrent, factor, voltageDrop, current, valid, factorSelected }) => {

    const onChangeVoltageDrop = React.useCallback((value) => update(value, 'voltageDrop'), [update])

    const onChangeRatioVoltage = React.useCallback((value) => updateRatioHandler(value, 'ratioVoltage'), [update])

    const onChangeRatioCurrent = React.useCallback((value) => updateRatioHandler(value, 'ratioCurrent'), [update])

    const setFactorSelected = React.useCallback((value) => value && update(value, 'factorSelected'), [update])

    const setRatioSelected = React.useCallback((value) => value && update(!value, 'factorSelected'), [update])

    const validateRatioVoltage = React.useCallback(() => validateRatioHandler('ratioVoltage'), [validateRatioHandler])

    const validateRatioCurrent = React.useCallback(() => validateRatioHandler('ratioCurrent'), [validateRatioHandler])

    return (
        <>
            <View style={styles.line}>
                <Radio
                    checked={!factorSelected}
                    onChange={setRatioSelected}
                    style={styles.radio}>Ratio</Radio>
                <Input
                    style={styles.input}
                    value={ratioVoltage}
                    onChangeText={onChangeRatioVoltage}
                    onEndEditing={validateRatioVoltage}
                    maxLength={4}
                    valid={valid.ratioVoltage}
                    property='ratioVoltage'
                    keyboardType='numeric'
                    unit='mV' />
                <Text style={styles.dash} category="p1">-</Text>
                <Input
                    onChangeText={onChangeRatioCurrent}
                    onEndEditing={validateRatioCurrent}
                    style={styles.input}
                    value={ratioCurrent}
                    maxLength={4}
                    valid={valid.ratioCurrent}
                    property='ratioCurrent'
                    keyboardType='numeric'
                    unit='A' />
            </View>
            <View style={styles.line}>
                <Radio
                    checked={factorSelected}
                    style={styles.radio}
                    onChange={setFactorSelected}
                >Factor</Radio>
                <Input
                    style={styles.input}
                    value={factor}
                    maxLength={8}
                    keyboardType='numeric'
                    onChangeText={updateFactorHandler}
                    onEndEditing={validateFactorHandler}
                    valid={valid.factor}
                    property='factor'
                    unit='A/mV' />
            </View>
            <View style={styles.line}>
                <Input
                    style={styles.left}
                    value={voltageDrop}
                    onChangeText={onChangeVoltageDrop}
                    onEndEditing={validateVoltageDropHandler}
                    maxLength={8}
                    keyboardType='numeric'
                    valid={valid.voltageDrop}
                    property='voltageDrop'
                    unit='mV'
                    label='Voltage drop' />
                <Input
                    style={styles.right}
                    placeholder='Unable to calculate'
                    disabled={true}
                    value={current}
                    valid={true}
                    property='current'
                    unit='A'
                    label='Current' />
            </View>
        </>
    )
}

export default React.memo(ShuntView)

const styles = StyleSheet.create({
    left: {
        flex: 1,
        paddingRight: 6,
        marginBottom: -12,
    },
    right: {
        flex: 1,
        paddingLeft: 6,
        marginBottom: -12,
    },
    radio: {
        flexBasis: 80,
        justifyContent: 'flex-start',
    },
    input: {
        flex: 1,
        marginBottom: -12
    },
    dash: {
        flexBasis: 20,
        textAlignVertical: 'center',
        textAlign: 'center',
        marginHorizontal: 4,
    },
    line: {
        flexDirection: 'row',
        paddingBottom: 12,
        justifyContent: 'center'
    }
})