import React from 'react'
import TextLine from '../../../../components/TextLine'
import Header from '../../components/Header'
import PotentialsView from '../PotentialsView'
import Divider from '../Divider'
import { AnodeMaterialLabels } from '../../../../constants/labels'

const AN = ({ data, potentialUnit, potentialHint, updatePotentialValue, validatePotential, subitemIndex, onEdit, onMultimeterPress, multimeterPaired }) => {
    const { name, type, wireColor, wireGauge, potentials, anodeMaterial } = data
    const dividerVisible = potentials.length > 0 || anodeMaterial !== null
    return (
        <>
            <Header
                wireColor={wireColor}
                wireGauge={wireGauge}
                title={name}
                icon={type}
                onEdit={onEdit} />
            <Divider visible={dividerVisible} />
            <PotentialsView
                multimeterPaired={multimeterPaired}
                onMultimeterPress={onMultimeterPress}
                subitemIndex={subitemIndex}
                updatePotentialValue={updatePotentialValue}
                validatePotential={validatePotential}
                unit={potentialUnit}
                potentialHint={potentialHint}
                potentials={potentials} />
            <TextLine title='Material' value={AnodeMaterialLabels[anodeMaterial] ?? null} />
        </>
    )
}
export default AN