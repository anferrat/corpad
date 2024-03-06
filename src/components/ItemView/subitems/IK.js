import React from 'react'
import { StyleSheet } from 'react-native'
import SubitemHeader from '../components/SubitemHeader'
import SidesDisplay from '../components/SidesDisplay'
import { CurrentUnitLabels, IsolationTypeLabels } from '../../../constants/labels'
import { CurrentUnits } from '../../../constants/global'
import TextLine from '../../TextLine'
import { danger, success } from '../../../styles/colors'


const IK = ({ name, type, shorted, sideA, sideB, current, isolationType, subitemIdMap, fromAtoB }) => {
    const value = shorted ? `${current} ${CurrentUnitLabels[CurrentUnits.AMPS]}` : null
    return (
        <>
            <SubitemHeader
                name={name}
                subitemType={type} />
            <SidesDisplay
                idMap={subitemIdMap}
                sideA={sideA}
                sideB={sideB}
                value={value}
                fromAtoB={fromAtoB}
                shorted={shorted}
            />
            <TextLine title='Status' value={shorted ? 'Shorted' : 'Isolated'} icon={shorted ? 'close' : 'checkmark-outline'} fill={shorted ? danger : success} />
            {shorted ? <TextLine title='Shorting current' value={current} unit={CurrentUnitLabels[CurrentUnits.AMPS]} /> : null}
            <TextLine title='Isolation type' value={IsolationTypeLabels[isolationType]} />
        </>
    )
}

export default IK

const styles = StyleSheet.create({
    container: {
    },
})