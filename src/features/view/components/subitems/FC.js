import React from 'react'
import Header from '../../components/Header'
import PotentialsView from '../PotentialsView'
import SmartDivider from '../Divider'

const FC = ({
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
    const { potentials, type, name, description } = data

    return (
        <>
            <Header
                title={name}
                icon={type}
                onEdit={onEdit} />
            <SmartDivider
                visible={potentials.length > 0} />
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
export default FC