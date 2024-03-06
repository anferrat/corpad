import React from 'react'
import SubitemHeader from '../components/SubitemHeader'
import PotentialView from '../components/PotentialView'
import TextLine from '../../TextLine'
import { PipeDiameterLabels } from '../../../constants/labels'


const PL = ({ name, type, potentials, nps, pipelineId, pipelines, potentialUnit }) => {
    const pipelineIndex = pipelines.findIndex(({ id }) => id === pipelineId)
    return (
        <>
            <SubitemHeader
                subitemType={type}
                name={name} />
            <PotentialView
                potentials={potentials}
                potentialUnit={potentialUnit} />
            <TextLine title='Pipeline' value={~pipelineIndex ? pipelines[pipelineIndex].name : null} icon='PL' pack='cp' />
            <TextLine title='Diameter' value={PipeDiameterLabels[nps]} />
        </>
    )
}

export default PL