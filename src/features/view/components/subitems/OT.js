import React from 'react'
import Header from '../Header'
import PotentialsView from '../PotentialsView'
import Divider from '../Divider'

const OT = ({
    data,
    potentialUnit,
    potentialHint,
    updatePotentialValue,
    validatePotential,
    subitemIndex,
    onEdit,
    onMultimeterPress,
    availableMeasurementTypes,
    selectedCaptureField,
    isMultimeterCaptureLoading
}) => {
    const { type, name, potentials, wireColor, wireGauge } = data
    return (
        <>
            <Header
                wireColor={wireColor}
                wireGauge={wireGauge}
                title={name}
                icon={type}
                onEdit={onEdit} />
            <Divider visible={potentials.length > 0} />
            <PotentialsView
                isMultimeterCaptureLoading={isMultimeterCaptureLoading}
                selectedCaptureField={selectedCaptureField}
                availableMeasurementTypes={availableMeasurementTypes}
                onMultimeterPress={onMultimeterPress}
                subitemIndex={subitemIndex}
                updatePotentialValue={updatePotentialValue}
                validatePotential={validatePotential}
                unit={potentialUnit}
                potentialHint={potentialHint}
                potentials={potentials} />
        </>
    )
}
export default OT