import React from 'react'
import SubitemHeader from '../components/SubitemHeader'
import TextLine from '../../TextLine'
import { AnodeBedMateriaTypelLabels, AnodeBedTypeLabesl, AnodeBedEnclosureTypeLabels } from '../../../constants/labels'
import AnodeBedAnodeView from '../components/AnodeBedAnodeView'
import { translateItemView } from '../../../localization'


const AB = ({ name, type, anodes, bedType, enclosureType, materialType }) => {
    const areAnodesDisplayed = anodes.filter(({ current }) => current !== null).length > 0
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type} />
            <TextLine title={translateItemView('anodeMaterial')} value={AnodeBedMateriaTypelLabels[materialType] ?? null} icon='cube-outline' />
            <TextLine title={translateItemView('bedType')} value={AnodeBedTypeLabesl[bedType] ?? null} />
            <TextLine title={translateItemView('enclosureType')} value={AnodeBedEnclosureTypeLabels[enclosureType] ?? null} />
            <TextLine title={translateItemView('anodeOutputCurrent')} value={areAnodesDisplayed ? ' ' : null} />
            {anodes.map(({ current, wireColor, wireGauge }, index) =>
                <AnodeBedAnodeView
                    key={index}
                    current={current}
                    wireColor={wireColor}
                    wireGauge={wireGauge}
                    index={index}
                />)}
        </>
    )
}

export default AB
