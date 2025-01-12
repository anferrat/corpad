import React from 'react'
import PotentialInput from './PotentialInput'

const PotentialsView = ({
    unit,
    potentialHint,
    potentials,
    validatePotential,
    updatePotentialValue,
    subitemIndex,
    onMultimeterPress,
    availableMeasurementTypes,
    selectedCaptureField,
    isMultimeterCaptureLoading
}) => {
    return (
        <>
            {potentials?.map(({ id, uid, name, referenceCellName, referenceCellType, value, valid, isAc }, index) => {
                const isCaptureSelected = selectedCaptureField !== null && selectedCaptureField.potentialId === id
                return <PotentialInput
                    isAc={isAc}
                    isMultimeterCaptureLoading={isMultimeterCaptureLoading}
                    isCaptureSelected={isCaptureSelected}
                    availableMeasurementTypes={availableMeasurementTypes}
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
                />
            })}
        </>
    )
}

export default React.memo(PotentialsView)