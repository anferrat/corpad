import React from 'react'
import LoaderPotentials from '../Potentials/LoaderPotentials'
import InputField from '../../InputField'
import WireView from '../WireView'

const OTCard = (props) => {
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
            <WireView
                selectedColor={props.cardData.wireColor}
                selectedGauge={props.cardData.wireGauge} />
        </>
    )
}

export default React.memo(OTCard)