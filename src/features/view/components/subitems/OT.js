import React from 'react'
import Header from '../Header'
import PotentialsView from '../PotentialsView'
import Divider from '../Divider'

const OT = ({ data, potentialUnit, potentialHint, updatePotentialValue, validatePotential, subitemIndex, onEdit, onMultimeterPress, multimeterPaired }) => {
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
                multimeterPaired={multimeterPaired}
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