import React from 'react'
import { StyleSheet } from 'react-native'
import SubitemHeader from '../components/SubitemHeader'
import SidesDisplay from '../components/SidesDisplay'
import TextLine from '../../TextLine'
import { CurrentUnitLabels } from '../../../constants/labels'
import { CurrentUnits } from '../../../constants/global'


const BD = ({ name, type, current, sideA, sideB, fromAtoB, subitemIdMap }) => {
    const value = current !== null ? `${current} ${CurrentUnitLabels[CurrentUnits.AMPS]}` : null
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type}
            />
            <SidesDisplay
                idMap={subitemIdMap}
                sideA={sideA}
                sideB={sideB}
                value={value}
                fromAtoB={fromAtoB}
            />
            <TextLine title={'Current'} value={current} unit={CurrentUnitLabels[CurrentUnits.AMPS]} />
        </>
    )
}

export default BD

const styles = StyleSheet.create({
    container: {
    },
})