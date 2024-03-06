import React from 'react'
import SubitemHeader from '../components/SubitemHeader'
import PotentialView from '../components/PotentialView'


const OT = ({ name, type, potentials, wireColor, wireGauge, potentialUnit }) => {
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type}
                wireColor={wireColor}
                wireGauge={wireGauge} />
            <PotentialView
                potentials={potentials}
                potentialUnit={potentialUnit} />
        </>
    )
}

export default OT
