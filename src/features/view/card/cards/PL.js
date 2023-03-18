import React from 'react'
import TextLine from '../../components/TextLine'
import Header from '../../components/Header'
import PotentialsView from '../../components/PotentialsView'
import SmartDivider from '../../components/Divider'
import { getPipelineNameById } from '../../../../helpers/functions'

const PL = (props) => {
    return (
        <>
            <Header
                wireColor={props.cardData?.wireColor}
                wireGauge={props.cardData?.wireGauge}
                title={props.cardData?.name}
                icon={props.cardData?.type}
                onPressEdit={props.navigateToEditSubitem} />
            <SmartDivider depend={[props.cardData.potentials.length !== 0, props.cardData.pipelineId]} />
            <PotentialsView
                itemId={props.itemId}
                potentials={props.cardData.potentials}
                unit={props.defaultPotentialUnit}
                referenceCellList={props.referenceCellList} />
            <TextLine title='Pipeline' value={getPipelineNameById(props.cardData.pipelineId, props.pipelineList)} icon='PL' pack='cp' hideEmpty />
        </>
    )
}
export default PL