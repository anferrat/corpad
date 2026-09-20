import React from 'react'
import SubitemHeader from '../components/SubitemHeader'
import TextLine from '../../TextLine'
import { CurrentUnitLabels, PotentialUnitLabels } from '../../../constants/labels'
import { CurrentUnits, PotentialUnits } from '../../../constants/global'
import { displayCurrentTarget, displayShuntRatio } from '../helpers/functions'
import { translateItemView } from '../../../localization'


const CT = ({ name, type, voltage, current, targetMin, targetMax, ratioCurrent, ratioVoltage }) => {
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type} />
            <TextLine title={translateItemView('current')} value={current} unit={CurrentUnitLabels[CurrentUnits.AMPS]} />
            <TextLine title={translateItemView('voltage')} value={voltage} unit={PotentialUnitLabels[PotentialUnits.VOLTS]} />
            <TextLine title={translateItemView('target')} value={displayCurrentTarget(targetMin, targetMax)} unit={CurrentUnitLabels[CurrentUnits.AMPS]} />
            <TextLine title={translateItemView('shuntRatio')} value={displayShuntRatio(ratioCurrent, ratioVoltage)} />
        </>
    )
}

export default CT
