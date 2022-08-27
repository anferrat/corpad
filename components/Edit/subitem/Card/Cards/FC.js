import React from 'react'
import LoaderPotentials from '../Potentials/LoaderPotentials'
import InputField from '../../InputField'

const FCCard = (props) => {
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
        </>
    )
}

export default React.memo(FCCard)