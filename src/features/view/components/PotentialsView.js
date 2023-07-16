import React from 'react'
import PotentialInput from './PotentialInput'

const PotentialsView = ({ unit, potentialHint, potentials, validatePotential, updatePotentialValue, subitemIndex, onMultimeterPress, multimeterPaired }) => {

    return (
        <>
            {potentials?.map(({ id, uid, name, referenceCellName, referenceCellType, value, valid }, index) =>
                <PotentialInput
                    multimeterPaired={multimeterPaired}
                    onMultimeterPress={onMultimeterPress}
                    key={`PotentialInput - ${uid}`}
                    displayHint={potentialHint}
                    potentialId={id}
                    potentialIndex={index}
                    subitemIndex={subitemIndex}
                    name={name}
                    referenceCellName={referenceCellName}
                    value={value}
                    valid={valid}
                    referenceCellType={referenceCellType}
                    validatePotential={validatePotential}
                    updatePotentialValue={updatePotentialValue}
                    unit={unit}
                />)}
        </>
    )
}

export default React.memo(PotentialsView)