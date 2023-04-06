import React from 'react'
import InputWithTitle from './InputWithTitle'
import { referenceCellCodes, potentialUnits } from '../../../constants/constants'

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
                main: potentialUnits[unit],
                script: referenceCellCodes[referenceCellType]
            }}
        />
    )
}

export default React.memo(PotentialInput)