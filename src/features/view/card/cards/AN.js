import React from 'react'
import TextLine from '../../components/TextLine'
import Header from '../../components/Header'
import PotentialsView from '../../components/PotentialsView'
import { anodeMaterialList } from '../../../../constants/constants'
import { getValue } from '../../../../helpers/functions'
import SmartDivider from '../../components/Divider'

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