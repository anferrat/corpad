import React from 'react'
import SubitemHeader from '../components/SubitemHeader'
import PotentialView from '../components/PotentialView'
import TextLine from '../../TextLine'
import { translateItemView } from '../../../localization'


const FC = ({ name, type, potentials, description, potentialUnit }) => {
    return (
        <>
            <SubitemHeader
                subitemType={type}
                name={name} />
            <PotentialView
                potentials={potentials}
                potentialUnit={potentialUnit} />
            <TextLine title={translateItemView('description')} value={description} />
        </>
    )
}

export default FC
