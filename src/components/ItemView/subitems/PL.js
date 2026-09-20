import React from 'react'
import SubitemHeader from '../components/SubitemHeader'
import PotentialView from '../components/PotentialView'
import TextLine from '../../TextLine'
import { translateItemView } from '../../../localization'


const PL = ({ name, type, potentials, wireColor, wireGauge, pipelineId, pipelines, potentialUnit }) => {
    const pipelineIndex = pipelines.findIndex(({ id }) => id === pipelineId)
    return (
        <>
            <SubitemHeader
                subitemType={type}
                name={name}
                wireColor={wireColor}
                wireGauge={wireGauge} />
            <PotentialView
                potentials={potentials}
                potentialUnit={potentialUnit} />
            <TextLine title={translateItemView('pipeline')} value={~pipelineIndex ? pipelines[pipelineIndex].name : null} icon='PL' pack='cp' />
        </>
    )
}

export default PL
