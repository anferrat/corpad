import React from 'react'
import { View, StyleSheet } from 'react-native'
import SubitemHeader from '../components/SubitemHeader'
import TextLine from '../../TextLine'
import { AreaUnitLabels, CouponTypeLabels, CurrentDensityUnitLabels, CurrentUnitLabels } from '../../../constants/labels'
import PotentialView from '../components/PotentialView'
import { AreaUnits, CurrentDensityUnits, CurrentUnits } from '../../../constants/global'
import { SubitemTypeIcons } from '../../../constants/icons'


const CN = ({ name, type, subitemIdMap, couponType, wireColor, wireGauge, potentials, pipelineCardId, area, density, current, potentialUnit }) => {
    const pipelineSubitem = subitemIdMap.get(pipelineCardId)
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
            <TextLine title={'Connected to'} value={pipelineSubitem ? pipelineSubitem.name : null} icon={pipelineSubitem ? SubitemTypeIcons[pipelineSubitem.type] : null} pack='cp' />
            <TextLine title={'Type'} value={CouponTypeLabels[couponType]} />
            <TextLine title='Area' value={area} unit={AreaUnitLabels[AreaUnits.CENTIMETER_SQUARE]} />
            <TextLine title='Current' value={current} unit={CurrentUnitLabels[CurrentUnits.MICRO_AMPS]} />
            <TextLine title='Current density' value={density} unit={CurrentDensityUnitLabels[CurrentDensityUnits.AMPS_OVER_METER_SQUARE]} />
        </>
    )
}

export default CN

const styles = StyleSheet.create({
    container: {
    },
})