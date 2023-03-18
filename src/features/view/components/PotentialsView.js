import React from 'react'
import InputWithTitle from './InputWithTitle'
import { potentialUnits, referenceCellCodes } from '../../../constants/constants'

const PotentialsView = ({ unit, displayHint, potentials, validatePotential, updatePotentialValue }) => {

    return (
        <>
            {potentials?.map(({ uid, name, referenceCellName, referenceCellType, value, valid, }) =>
                <InputWithTitle
                    onEndEditing={validatePotential}
                    onChangeText={updatePotentialValue}
                    keyboardType='numeric'
                    displayHint={displayHint}
                    hintTitle={referenceCellName}
                    hintIcon='RE'
                    key={`PotentialValue-${uid}`}
                    value={value}
                    title={name}
                    valid={valid}
                    property='potential'
                    unit={{
                        main: potentialUnits[unit],
                        script: referenceCellCodes[referenceCellType].rcType
                    }}
                />)}
        </>
    )
}

export default PotentialsView