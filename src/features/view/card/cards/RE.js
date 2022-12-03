import React from 'react'
import TextLine from '../../components/TextLine'
import Header from '../../components/Header'
import PotentialsView from '../PotentialsView'
import { referenceCellTypes } from '../../../../constants/constants'
import { getValue } from '../../../../helpers/functions'
import SmartDivider from '../../components/SmartDivider'

const RE = (props) => {
    return (
        <>
            <Header
                wireColor={props.cardData?.wireColor}
                wireGauge={props.cardData?.wireGauge}
                title={props.cardData?.name}
                icon={props.cardData?.type}
                onPressEdit={props.navigateToEditSubitem} />
            <SmartDivider depend={[props.cardData.potentials.length !== 0, props.cardData.rcType]} />
            <PotentialsView
                itemId={props.itemId}
                potentials={props.cardData.potentials}
                unit={props.defaultPotentialUnit}
                referenceCellList={props.referenceCellList} />
            <TextLine title='Material' value={getValue(props.cardData?.rcType, referenceCellTypes)} hideEmpty />
        </>
    )
}
export default RE