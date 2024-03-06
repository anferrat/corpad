import React from 'react'
import { View, StyleSheet } from 'react-native'
import SubitemHeader from '../components/SubitemHeader'
import { AnodeMaterialLabels } from '../../../constants/labels'
import PotentialView from '../components/PotentialView'
import TextLine from '../../TextLine'


const AN = ({ name, type, anodeMaterial, wireColor, wireGauge, potentials, potentialUnit }) => {
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type}
                wireColor={wireColor}
                wireGauge={wireGauge} />
            <PotentialView
                potentialUnit={potentialUnit}
                potentials={potentials} />
            <TextLine title='Anode material' value={AnodeMaterialLabels[anodeMaterial]} icon='cube-outline' />

        </>
    )
}

export default AN

const styles = StyleSheet.create({
    container: {
    },
})