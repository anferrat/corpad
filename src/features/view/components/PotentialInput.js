import React from 'react'
import InputWithTitle from './InputWithTitle'
import { PotentialUnitLabels, ReferenceCellCodeLabels } from '../../../constants/labels'

const PotentialInput = ({ potentialId, name, referenceCellName, referenceCellType, value, valid, validatePotential, updatePotentialValue, unit, displayHint, subitemIndex, potentialIndex }) => {

    const onEndEditing = React.useCallback(() => {
        validatePotential(value, unit, subitemIndex, potentialId, potentialIndex)
    }, [potentialId, subitemIndex, potentialIndex, value, unit])

    const onChangeText = React.useCallback((text) => {
        updatePotentialValue(text, subitemIndex, potentialIndex)
    }, [subitemIndex, potentialIndex])

    return (
        <InputWithTitle
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
            unit={{
                main: PotentialUnitLabels[unit],
                script: ReferenceCellCodeLabels[referenceCellType]
            }}
        />
    )
}

export default React.memo(PotentialInput)