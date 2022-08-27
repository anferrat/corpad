import React from 'react'
import TextLine from '../../../_Stateless/TextLine'
import Header from '../../../_Stateless/ViewItem/Header'
import PotentialsView from '../PotentialsView'
import { anodeMaterialList } from '../../../../constants/constants'
import { getValue } from '../../../customFunctions'
import SmartDivider from '../../../_Stateless/SmartDivider'

const AN = (props) => {
    return (
        <>
            <Header
                wireColor={props.cardData?.wireColor}
                wireGauge={props.cardData?.wireGauge}
                title={props.cardData?.name}
                icon={props.cardData?.type}
                onPressEdit={props.navigateToEditSubitem} />
            <SmartDivider depend={[props.cardData.potentials.length !== 0, props.cardData.anodeMaterial]} />
            <PotentialsView
                itemId={props.itemId}
                unit={props.defaultPotentialUnit}
                potentials={props.cardData.potentials}
                referenceCellList={props.referenceCellList} />
            <TextLine title='Material' value={getValue(props.cardData?.anodeMaterial, anodeMaterialList)} hideEmpty />
        </>
    )
}
export default AN