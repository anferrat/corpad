import React from 'react'
import { View, StyleSheet } from 'react-native'
import SubitemHeader from '../components/SubitemHeader'
import TextLine from '../../TextLine'
import { AreaUnitLabels, CouponTypeLabels, CurrentDensityUnitLabels, CurrentUnitLabels } from '../../../constants/labels'
import PotentialView from '../components/PotentialView'
import { AreaUnits, CurrentDensityUnits, CurrentUnits } from '../../../constants/global'
import { SubitemTypeIcons } from '../../../constants/icons'
import { translateItemView } from '../../../localization'


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
            <TextLine title={translateItemView('connectedTo')} value={pipelineSubitem ? pipelineSubitem.name : null} icon={pipelineSubitem ? SubitemTypeIcons[pipelineSubitem.type] : null} pack='cp' />
            <TextLine title={translateItemView('type')} value={CouponTypeLabels[couponType]} />
            <TextLine title={translateItemView('area')} value={area} unit={AreaUnitLabels[AreaUnits.CENTIMETER_SQUARE]} />
            <TextLine title={translateItemView('current')} value={current} unit={CurrentUnitLabels[CurrentUnits.MICRO_AMPS]} />
            <TextLine title={translateItemView('currentDensity')} value={density} unit={CurrentDensityUnitLabels[CurrentDensityUnits.AMPS_OVER_METER_SQUARE]} />
        </>
    )
}

export default CN

const styles = StyleSheet.create({
    container: {
    },
})
