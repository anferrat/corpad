import React from 'react'
import SubitemHeader from '../components/SubitemHeader'
import TextLine from '../../TextLine'
import { CurrentUnitLabels, PotentialUnitLabels } from '../../../constants/labels'
import { CurrentUnits, PotentialUnits } from '../../../constants/global'
import { displayCurrentTarget, displayShuntRatio } from '../helpers/functions'


const CT = ({ name, type, voltage, current, targetMin, targetMax, ratioCurrent, ratioVoltage }) => {
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type} />
            <TextLine title={'Current'} value={current} unit={CurrentUnitLabels[CurrentUnits.AMPS]} />
            <TextLine title={'Voltage'} value={voltage} unit={PotentialUnitLabels[PotentialUnits.VOLTS]} />
            <TextLine title='Target' value={displayCurrentTarget(targetMin, targetMax)} unit={CurrentUnitLabels[CurrentUnits.AMPS]} />
            <TextLine title='Shunt ratio' value={displayShuntRatio(ratioCurrent, ratioVoltage)} />
        </>
    )
}

export default CT