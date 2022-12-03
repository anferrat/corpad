import React, { useMemo } from 'react'
import LoaderPotentials from '../potentials/LoaderPotentials'
import SelectField from '../../SelectField'
import WireView from '../WireView'
import InputField from '../../InputField'
import { Icon } from '@ui-kitten/components'
import { basic } from '../../../../../styles/colors'

const PLCard = (props) => {
    const pipeResultList = useMemo(() => props.pipelineList.map(pipeline => pipeline.id), [props.pipelineList])
    const pipeItemList = useMemo(() => props.pipelineList.map(pipeline => pipeline.name), [props.pipelineList])
    const selectedPipe = useMemo(() => props.cardData.pipelineId !== null ? props.pipelineList.findIndex(pipeline => pipeline.id === props.cardData.pipelineId) : null, [props.pipelineList, props.cardData.pipelineId])
    const accessoryList = useMemo(() => props.pipelineList.map((props) => <Icon {...props} pack='cp' name='PL' fill={basic}  />), [props.pipelineList])
    return <>
        <InputField
            maxLength={40}
            value={props.cardData.name}
            valid={props.cardData.valid.name}
            property='name'
            label='Name'
            placeholder={props.cardData.defaultName} />
        <SelectField
            accessoryList={accessoryList}
            resultList={pipeResultList}
            property='pipelineId'
            itemsList={pipeItemList}
            selectedItem={selectedPipe}
            placeholder="Select pipeline"
            label='Pipeline' />
        <LoaderPotentials
            cardId={props.cardData.id}
            referenceCellList={props.referenceCellList} />
        <WireView
            selectedColor={props.cardData.wireColor}
            selectedGauge={props.cardData.wireGauge} />
    </>
}

export default React.memo(PLCard)

/*
<SelectField
            property='pipelineId'
            itemsList={[]}
            selectedItem={props.cardData.pipelineId}
            placeholder="Select pipeline"
            label='Pipeline' />
            */