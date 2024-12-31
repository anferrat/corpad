import React from 'react'
import InputWithTitle from './InputWithTitle'
import { PotentialUnitLabels, ReferenceCellCodeLabels } from '../../../constants/labels'
import { MeasurementPropertyTypes } from '../../../constants/global'

const PotentialInput = ({
    potentialId,
    name,
    referenceCellName,
    referenceCellType,
    value,
    valid,
    validatePotential,
    updatePotentialValue,
    unit,
    displayHint,
    subitemIndex,
    potentialIndex,
    onMultimeterPress,
    availableMeasurementTypes,
    isCaptureSelected,
    isMultimeterCaptureLoading }) => {

    const onEndEditing = React.useCallback(() => {
        validatePotential(value, unit, subitemIndex, potentialId, potentialIndex)
    }, [potentialId, subitemIndex, potentialIndex, value, unit])

    const onChangeText = React.useCallback((text) => {
        updatePotentialValue(text, subitemIndex, potentialIndex)
    }, [subitemIndex, potentialIndex])

    const multimeterAvailable = ~availableMeasurementTypes.indexOf(MeasurementPropertyTypes.POTENTIAL)

    const onMultimeterPressHandler = React.useCallback(() => {
        onMultimeterPress(MeasurementPropertyTypes.POTENTIAL, 'potential', potentialId, potentialIndex)
    }, [potentialId, onMultimeterPress, potentialIndex])

    const unitComp = React.useMemo(() => ({
        main: PotentialUnitLabels[unit],
        script: ReferenceCellCodeLabels[referenceCellType]
    }), [unit, referenceCellType])

    return (
        <InputWithTitle
            isCaptureLoading={isMultimeterCaptureLoading}
            isCaptureSelected={isCaptureSelected}
            onMultimeterPress={onMultimeterPressHandler}
            multimeterAvailable={multimeterAvailable}
            onEndEditing={onEndEditing}
            onChangeText={onChangeText}
            keyboardType='numeric'
            displayHint={displayHint}
            hintTitle={referenceCellName}
            hintIcon='RE'
            value={value}
            title={name}
            valid={valid}
            property='potential'
            unit={unitComp}
        />
    )
}

export default React.memo(PotentialInput)