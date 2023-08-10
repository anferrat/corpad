import React from 'react'
import TextLine from '../../../../components/TextLine'
import Header from '../Header'
import Divider from '../Divider'
import InputWithTitle from '../InputWithTitle'
import { MultimeterMeasurementTypes } from '../../../../constants/global'

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

const CT = ({ data, validateVoltage, validateCurrent, updatePropertyValue, onEdit, subitemIndex, availableMeasurementTypes, onMultimeterPress }) => {
    const { name, type, voltage, current, targetMin, targetMax, valid, ratioCurrent, ratioVoltage } = data

    const targetDisplay = React.useMemo(() => targetDisplayHandler(targetMin, targetMax), [targetMin, targetMax])

    const shuntDisplay = React.useMemo(() => getRatio(ratioCurrent, ratioVoltage), [ratioCurrent, ratioVoltage])

    const multimeterAvailable = ~availableMeasurementTypes.indexOf(MultimeterMeasurementTypes.VOLTAGE)

    const onChangeCurrent = React.useCallback((value) => updatePropertyValue(value, subitemIndex, 'current'), [subitemIndex, updatePropertyValue])

    const onEndEditingCurrent = React.useCallback(() => validateCurrent(subitemIndex, data), [subitemIndex, current, validateCurrent])

    const onChangeVoltage = React.useCallback((value) => updatePropertyValue(value, subitemIndex, 'voltage'), [subitemIndex, updatePropertyValue])

    const onEndEditingVoltage = React.useCallback(() => validateVoltage(subitemIndex, data), [subitemIndex, voltage, validateVoltage])

    const onMultimeterPressHandler = React.useCallback(() => {
        onMultimeterPress(MultimeterMeasurementTypes.VOLTAGE)
    }, [onMultimeterPress])

    return (
        <>
            <Header
                title={name}
                icon={type}
                onEdit={onEdit} />
            <Divider visible={true} />
            <InputWithTitle
                onChangeText={onChangeCurrent}
                onEndEditing={onEndEditingCurrent}
                keyboardType='numeric'
                value={current}
                valid={valid.current}
                title='Current'
                property='current'
                unit={'A'} />
            <InputWithTitle
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
            <TextLine title='Target' value={targetDisplay} unit='A' />
            <TextLine title='Shunt ratio' value={shuntDisplay} />
        </>
    )
}
export default CT