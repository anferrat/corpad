import React from 'react'
import TextLine from '../../../../components/TextLine'
import Header from '../../components/Header'
import PotentialsView from '../PotentialsView'
import Divider from '../Divider'
import { PipeDiameterLabels } from '../../../../constants/labels'

const RS = ({ data, potentialUnit, potentialHint, updatePotentialValue, validatePotential, subitemIndex, onEdit, pipelineList, onMultimeterPress, availableMeasurementTypes }) => {
    const { name, type, wireColor, wireGauge, potentials, pipelineId, nps } = data
    const pipelineIndex = pipelineList.findIndex(({ id }) => id === pipelineId)
    return (
        <>
            <Header
                wireColor={wireColor}
                wireGauge={wireGauge}
                title={name}
                icon={type}
                onEdit={onEdit} />
            <Divider
                visible={potentials.length > 0 || ~pipelineIndex || nps !== null} />
            <PotentialsView
                availableMeasurementTypes={availableMeasurementTypes}
                onMultimeterPress={onMultimeterPress}
                subitemIndex={subitemIndex}
                updatePotentialValue={updatePotentialValue}
                validatePotential={validatePotential}
                unit={potentialUnit}
                potentialHint={potentialHint}
                potentials={potentials} />
            <TextLine
                title='Diameter'
                value={PipeDiameterLabels[nps] ?? null} />
            <TextLine
                title='Pipeline'
                value={~pipelineIndex ? pipelineList[pipelineIndex].name : null}
                icon='PL'
                pack='cp' />
        </>
    )
}

export default RS