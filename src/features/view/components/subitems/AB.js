import React from 'react'
import TextLine from '../../../../components/TextLine'
import Header from '../../components/Header'
import Divider from '../Divider'
import { AnodeBedEnclosureTypeLabels, AnodeBedMateriaTypelLabels, AnodeBedTypeLabesl, AnodeMaterialLabels } from '../../../../constants/labels'
import AnodeBedAnodeView from '../AnodeBedAnodeView'
import { translateView } from '../../../../localization'

const AB = ({ data, onEdit }) => {
    const { name, type, bedType, enclosureType, materialType, anodes } = data
    const displayedAnodes = anodes.filter(({ current }) => current !== null).length > 0
    const dividerVisible = materialType !== null || bedType !== null || enclosureType !== null || displayedAnodes
    return (
        <>
            <Header
                title={name}
                icon={type}
                onEdit={onEdit} />
            <Divider visible={dividerVisible} />
            <TextLine title={translateView('anodeMaterial')} value={AnodeBedMateriaTypelLabels[materialType] ?? null} icon='cube-outline' />
            <TextLine title={translateView('bedType')} value={AnodeBedTypeLabesl[bedType] ?? null} />
            <TextLine title={translateView('enclosureType')} value={AnodeBedEnclosureTypeLabels[enclosureType] ?? null} />
            <TextLine title={translateView('anodeOutputCurrent')} value={displayedAnodes ? ' ' : null} />
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
