import React from 'react'
import { View, StyleSheet } from 'react-native'
import SubitemHeader from '../components/SubitemHeader'
import TextLine from '../../TextLine'
import { AnodeBedMateriaTypelLabels, AnodeBedTypeLabesl, AnodeBedEnclosureTypeLabels } from '../../../constants/labels'
import AnodeBedAnodeView from '../components/AnodeBedAnodeView'


const AB = ({ name, type, anodes, bedType, enclosureType, materialType }) => {
    const areAnodesDisplayed = anodes.filter(({ current }) => current !== null).length > 0
    console.log(name)
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type} />
            <TextLine title='Anode material' value={AnodeBedMateriaTypelLabels[materialType] ?? null} icon='cube-outline' />
            <TextLine title='Bed type' value={AnodeBedTypeLabesl[bedType] ?? null} />
            <TextLine title='Enclousre type' value={AnodeBedEnclosureTypeLabels[enclosureType] ?? null} />
            <TextLine title='Anode ouput current' value={areAnodesDisplayed ? ' ' : null} />
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