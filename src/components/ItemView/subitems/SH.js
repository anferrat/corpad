import React from 'react'
import { displayShuntRatio } from '../helpers/functions'
import SubitemHeader from '../components/SubitemHeader'
import SidesDisplay from '../components/SidesDisplay'
import { CurrentUnitLabels, FactorUnitLabels, PotentialUnitLabels } from '../../../constants/labels'
import { CurrentUnits, FactorUnits, PotentialUnits } from '../../../constants/global'
import TextLine from '../../TextLine'


const SH = ({ name, type, factorSelected, ratioCurrent, ratioVoltage, factor, voltageDrop, current, sideA, sideB, fromAtoB, subitemIdMap }) => {
    const shuntRatio = displayShuntRatio(ratioCurrent, ratioVoltage)
    const value = current !== null ? `${current} ${CurrentUnitLabels[CurrentUnits.AMPS]}` : null
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type} />
            <SidesDisplay
                idMap={subitemIdMap}
                sideA={sideA}
                sideB={sideB}
                fromAtoB={fromAtoB}
                value={value} />
            <TextLine title={factorSelected ? 'Factor' : 'Shunt ratio'} value={factorSelected ? factor : shuntRatio} unit={factorSelected ? FactorUnitLabels[FactorUnits.AMPS_OVER_VOLTS] : null} />
            <TextLine title={'Volatge drop'} value={voltageDrop} unit={PotentialUnitLabels[PotentialUnits.MILIVOLTS]} />
        </>
    )
}

export default SH