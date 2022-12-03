import React, { useMemo } from 'react'
import LoaderPotentials from '../potentials/LoaderPotentials'
import SelectField from '../../SelectField'
import InputField from '../../InputField'
import { pipeDiameterList } from '../../../../../constants/constants'
import { Icon } from '@ui-kitten/components'
import { basic } from '../../../../../styles/colors'

const RSCard = (props) => {
    const pipeResultList = useMemo(() => props.pipelineList.map(pipeline => pipeline.id), [props.pipelineList])
    const pipeItemList = useMemo(() => props.pipelineList.map(pipeline => pipeline.name), [props.pipelineList])
    const selectedPipe = useMemo(() => props.cardData.pipelineId !== null ? props.pipelineList.findIndex(pipeline => pipeline.id === props.cardData.pipelineId) : null, [props.pipelineList, props.cardData.pipelineId])
    const accessoryList = useMemo(() => props.pipelineList.map((props) => <Icon {...props} pack='cp' name='PL' fill={basic} />), [props.pipelineList])
    return (
        <>
            <InputField
                maxLength={40}
                value={props.cardData.name}
                valid={props.cardData.valid.name}
                property='name'
                label='Name'
                placeholder={props.cardData.defaultName} />
            <LoaderPotentials
                cardId={props.cardData.id}
                referenceCellList={props.referenceCellList} />
            <SelectField
                accessoryList={accessoryList}
                resultList={pipeResultList}
                property='pipelineId'
                itemsList={pipeItemList}
                selectedItem={selectedPipe}
                placeholder="Select pipeline"
                label='Pipeline' />
            <SelectField
                property='nps'
                itemsList={pipeDiameterList}
                selectedItem={props.cardData.nps}
                placeholder="Select NPS"
                label='Diameter' />
        </>
    )
}

export default React.memo(RSCard)