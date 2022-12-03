import React from 'react'
import LoaderPotentials from '../potentials/LoaderPotentials'
import SelectField from '../../SelectField'
import InputField from '../../InputField'
import WireView from '../WireView'
import { anodeMaterialList } from '../../../../../constants/constants'

const ANCard = (props) => {
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
                property='anodeMaterial'
                itemsList={anodeMaterialList}
                selectedItem={props.cardData.anodeMaterial}
                placeholder="Select material"
                label='Anode material' />
            <WireView
                selectedColor={props.cardData.wireColor}
                selectedGauge={props.cardData.wireGauge} />
        </>
    )
}

export default React.memo(ANCard)