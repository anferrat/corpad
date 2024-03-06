import React from 'react'
import SubitemHeader from '../components/SubitemHeader'
import PotentialView from '../components/PotentialView'
import TextLine from '../../TextLine'


const FC = ({ name, type, potentials, description, potentialUnit }) => {
    return (
        <>
            <SubitemHeader
                subitemType={type}
                name={name} />
            <PotentialView
                potentials={potentials}
                potentialUnit={potentialUnit} />
            <TextLine title='Description' value={description} />
        </>
    )
}

export default FC
