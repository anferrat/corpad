import React from 'react'
import TextLine from '../../../../components/TextLine'
import Header from '../Header'
import Divider from '../Divider'
import SidesDisplay from '../SidesDisplay'
import InputWithTitle from '../InputWithTitle'
import { MeasurementPropertyTypes } from '../../../../constants/global'

const getShuntRatio = (ratioVoltage, ratioCurrent) => ratioVoltage !== null && ratioCurrent !== null ? ratioVoltage + ' mV - ' + ratioCurrent + ' A' : null

const SH = ({
    data,
    validateVoltageDrop,
    updatePropertyValue,
    onEdit,
    idMap,
    subitemIndex,
    onMultimeterPress,
    availableMeasurementTypes,
    selectedCaptureField,
    isMultimeterCaptureLoading
}) => {
    const { factorSelected, name, type, factor, ratioVoltage, ratioCurrent, voltageDrop, current, sideA, sideB, fromAtoB, valid } = data

    const shuntRatio = React.useMemo(() => getShuntRatio(ratioVoltage, ratioCurrent),
        [ratioVoltage, ratioCurrent])

    const currentValue = current !== null ? current + ' A' : null

    const multimeterAvailable = ~availableMeasurementTypes.indexOf(MeasurementPropertyTypes.VOLTAGE_DROP)

    const isVoltageDropCaptureSelected = selectedCaptureField !== null && selectedCaptureField.property === 'voltageDrop'

    const onChangeVoltageDrop = React.useCallback((value) =>
        updatePropertyValue(value, subitemIndex, 'voltageDrop'),
        [subitemIndex, updatePropertyValue])

    const onEndEditingCurrent = React.useCallback(() => validateVoltageDrop(subitemIndex, data),
        [subitemIndex, data, validateVoltageDrop])

    const onMultimeterPressHandler = React.useCallback(() => {
        onMultimeterPress(MeasurementPropertyTypes.VOLTAGE_DROP, 'voltageDrop')
    }, [onMultimeterPress])

    return (
        <>
            <Header
                title={name}
                icon={type}
                onEdit={onEdit} />
            <Divider
                visible={true} />
            <SidesDisplay
                value={currentValue}
                fromAtoB={fromAtoB}
                idMap={idMap}
                sideA={sideA}
                sideB={sideB} />
            <Divider
                visible={true} />
            <TextLine
                title={factorSelected ? 'Factor' : 'Shunt ratio'}
                value={factorSelected ? factor : shuntRatio}
                unit={factorSelected ? 'A/mV' : null} />
            <InputWithTitle
                isCaptureLoading={isMultimeterCaptureLoading}
                isCaptureSelected={isVoltageDropCaptureSelected}
                onMultimeterPress={onMultimeterPressHandler}
                multimeterAvailable={multimeterAvailable}
                onChangeText={onChangeVoltageDrop}
                keyboardType='numeric'
                value={voltageDrop}
                valid={valid.voltageDrop}
                onEndEditing={onEndEditingCurrent}
                title='Voltage drop'
                property='voltageDrop'
                unit={'mV'} />
        </>
    )
}
export default SH

