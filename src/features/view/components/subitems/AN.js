import React from 'react'
import TextLine from '../../components/TextLine'
import Header from '../../components/Header'
import PotentialsView from '../PotentialsView'
import { anodeMaterialList } from '../../../../constants/constants'
import { getValue } from '../../../../helpers/functions'
import Divider from '../Divider'

const AN = ({ data, potentialUnit, potentialHint, updatePotentialValue, validatePotential }) => {
    const { name, type, wireColor, wireGauge, potentials, anodeMaterial } = data
    const dividerVisible = potentials.length > 0 && anodeMaterial !== null
    return (
        <>
            <Header
                wireColor={wireColor}
                wireGauge={wireGauge}
                title={name}
                icon={type}
                onPressEdit={() => { }} />
            <Divider visible={dividerVisible} />
            <PotentialsView
                updatePotentialValue={updatePotentialValue}
                validatePotential={validatePotential}
                unit={potentialUnit}
                potentialHint={potentialHint}
                potentials={potentials} />
            <TextLine title='Material' value={anodeMaterialList[anodeMaterial] ?? null} />
        </>
    )
}
export default AN