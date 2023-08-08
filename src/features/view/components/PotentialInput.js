import React from 'react'
import InputWithTitle from './InputWithTitle'
import { PotentialUnitLabels, ReferenceCellCodeLabels } from '../../../constants/labels'
import { MultimeterMeasurementTypes } from '../../../constants/global'

const PotentialInput = ({ potentialId, name, referenceCellName, referenceCellType, value, valid, validatePotential, updatePotentialValue, unit, displayHint, subitemIndex, potentialIndex, onMultimeterPress, multimeterPaired }) => {

    const onEndEditing = React.useCallback(() => {
        validatePotential(value, unit, subitemIndex, potentialId, potentialIndex)
    }, [potentialId, subitemIndex, potentialIndex, value, unit])

    const onChangeText = React.useCallback((text) => {
        updatePotentialValue(text, subitemIndex, potentialIndex)
    }, [subitemIndex, potentialIndex])

    const onMultimeterPressHandler = React.useCallback(() => {
        onMultimeterPress(MultimeterMeasurementTypes.POTENTIALS, potentialId)
    }, [potentialId, onMultimeterPress])

    const unitComp = React.useMemo(() => ({
        main: PotentialUnitLabels[unit],
        script: ReferenceCellCodeLabels[referenceCellType]
    }), [unit, referenceCellType])

    return (
        <InputWithTitle
            onMultimeterPress={onMultimeterPressHandler}
            multimeterPaired={multimeterPaired}
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