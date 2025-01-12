import React, { useCallback } from 'react'
import TextLine from '../../../../components/TextLine'
import Header from '../Header'
import Divider from '../Divider'
import InputWithTitle from '../InputWithTitle'
import { MeasurementPropertyTypes } from '../../../../constants/global'
import CurrentInputModeRadio from '../CurrentInputModeRadio'
import { StyleSheet, View } from 'react-native'

const getRatio = (ratioCurrent, ratioVoltage) => {
    if (ratioCurrent && ratioVoltage)
        return + ratioVoltage + ' mV - ' + ratioCurrent + ' A'
    else return null
}

const targetDisplayHandler = (min, max) => {
    if (min === null && max === null) {
        return null
    }
    else
        if (min === null) {
            return 'Max. ' + max
        }
        else if (max === null) {
            return 'Min. ' + min
        }
        else return min + ' - ' + max
}

const CT = ({
    data,
    validateVoltage,
    validateCurrent,
    validateVoltageDropForCircuit,
    updatePropertyValue,
    onEdit,
    subitemIndex,
    availableMeasurementTypes,
    onMultimeterPress,
    selectedCaptureField,
    isMultimeterCaptureLoading
}) => {
    const { name, type, voltage, current, targetMin, targetMax, valid, ratioCurrent, ratioVoltage, voltageDrop, isVoltageDropSelected } = data

    //isVoltageDropSelecetd selected is undefined at start. it is not saved or obtained at the backend

    const targetDisplay = React.useMemo(() => targetDisplayHandler(targetMin, targetMax), [targetMin, targetMax])

    const shuntDisplay = React.useMemo(() => getRatio(ratioCurrent, ratioVoltage), [ratioCurrent, ratioVoltage])

    const isVoltageDropAvailable = React.useMemo(() => Boolean(ratioCurrent) && Boolean(ratioVoltage), [ratioCurrent, ratioVoltage])

    const multimeterAvailable = ~availableMeasurementTypes.indexOf(MeasurementPropertyTypes.VOLTAGE)

    const voltageDropMultimeterAvailable = ~availableMeasurementTypes.indexOf(MeasurementPropertyTypes.VOLTAGE_DROP)

    const isVoltageDropCaptureSelected = selectedCaptureField !== null && selectedCaptureField.property === 'voltageDrop'

    const isVoltageCaptureSelected = selectedCaptureField !== null && selectedCaptureField.property === 'voltage'

    const onChangeCurrent = React.useCallback((value) => updatePropertyValue(value, subitemIndex, 'current'), [subitemIndex, updatePropertyValue])

    const onChangeVoltageDrop = React.useCallback((value) => updatePropertyValue(value, subitemIndex, 'voltageDrop'), [subitemIndex, updatePropertyValue])

    const onChangeInputMode = useCallback((value) => updatePropertyValue(value, subitemIndex, 'isVoltageDropSelected'), [updatePropertyValue])

    const onEndEditingCurrent = React.useCallback(() => validateCurrent(subitemIndex, { ...data, voltageDrop: null }), [subitemIndex, current, validateCurrent]) //reset voltageDrop, otherwise it'll block current updates

    const onEndEditingVoltageDrop = React.useCallback(() => validateVoltageDropForCircuit(subitemIndex, data), [subitemIndex, voltageDrop, validateVoltageDropForCircuit])

    const onChangeVoltage = React.useCallback((value) => updatePropertyValue(value, subitemIndex, 'voltage'), [subitemIndex, updatePropertyValue])

    const onEndEditingVoltage = React.useCallback(() => validateVoltage(subitemIndex, data), [subitemIndex, voltage, validateVoltage])

    const onMultimeterPressHandler = React.useCallback(() => {
        onMultimeterPress(MeasurementPropertyTypes.VOLTAGE, 'voltage')
    }, [onMultimeterPress])

    const onVoltageDropMultimeterPressHandler = React.useCallback(() => onMultimeterPress(MeasurementPropertyTypes.VOLTAGE_DROP, 'voltageDrop'), [onMultimeterPress])

    return (
        <>
            <Header
                title={name}
                icon={type}
                onEdit={onEdit} />
            <Divider visible={true} />
            <InputWithTitle
                isCaptureLoading={isMultimeterCaptureLoading}
                isCaptureSelected={isVoltageCaptureSelected}
                multimeterAvailable={multimeterAvailable}
                onMultimeterPress={onMultimeterPressHandler}
                onChangeText={onChangeVoltage}
                onEndEditing={onEndEditingVoltage}
                keyboardType='numeric'
                value={voltage}
                valid={valid.voltage}
                title='Voltage'
                property='voltage'
                unit={'V'} />
            {isVoltageDropAvailable ?
                <CurrentInputModeRadio
                    disabled={isVoltageDropCaptureSelected}
                    onChange={onChangeInputMode}
                    isVoltageDropSelected={isVoltageDropSelected} /> : null}
            {isVoltageDropSelected && isVoltageDropAvailable ?
                <InputWithTitle
                    isCaptureLoading={isMultimeterCaptureLoading}
                    isCaptureSelected={isVoltageDropCaptureSelected}
                    multimeterAvailable={voltageDropMultimeterAvailable}
                    onMultimeterPress={onVoltageDropMultimeterPressHandler}
                    onChangeText={onChangeVoltageDrop}
                    onEndEditing={onEndEditingVoltageDrop}
                    keyboardType='numeric'
                    value={voltageDrop}
                    valid={valid.voltageDrop}
                    title='Voltage drop'
                    property='voltageDrop'
                    unit={'mV'} /> :
                <InputWithTitle
                    onChangeText={onChangeCurrent}
                    onEndEditing={onEndEditingCurrent}
                    keyboardType='numeric'
                    value={current}
                    valid={valid.current}
                    title='Current'
                    property='current'
                    unit={'A'} />}
            <View style={styles.values}>
                {isVoltageDropSelected ? <TextLine title='Current' value={current} unit='A' /> : null}
                <TextLine title='Shunt ratio' value={shuntDisplay} />
                <TextLine title='Target' value={targetDisplay} unit='A' />
            </View>
        </>
    )
}
export default CT

const styles = StyleSheet.create({
    values: {
        marginTop: -12
    }
})