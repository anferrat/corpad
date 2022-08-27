import React from 'react'
import LoaderPotentials from '../Potentials/LoaderPotentials'
import SelectField from '../../SelectField'
import WireView from '../WireView'
import { referenceCellTypes } from '../../../../../constants/constants'
import InputField from '../../InputField'

const RECard = (props) => {
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
                property='rcType'
                itemsList={referenceCellTypes}
                selectedItem={props.cardData.rcType}
                placeholder="Select type"
                label='Reference cell type' />
            <WireView
                selectedColor={props.cardData.wireColor}
                selectedGauge={props.cardData.wireGauge} />
        </>
    )
}

export default React.memo(RECard)