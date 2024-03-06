import React from 'react'
import PotentialView from '../components/PotentialView'
import SubitemHeader from '../components/SubitemHeader'
import TextLine from '../../TextLine'
import { ReferenceCellTypeLabels } from '../../../constants/labels'


const RE = ({ name, type, potentials, potentialUnit, rcType, wireColor, wireGauge }) => {
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type}
                wireColor={wireColor}
                wireGauge={wireGauge} />
            <PotentialView
                potentialUnit={potentialUnit}
                potentials={potentials} />
            <TextLine title='Type' value={ReferenceCellTypeLabels[rcType]} />
        </>
    )
}

export default RE
