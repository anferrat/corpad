import React from 'react'
import PotentialsView from '../potentials/PotentialsView'
import NameInput from '../NameInput'

const FCCard = ({ itemId, subitemId, data, validate, update }) => {
    const { name, valid, defaultName } = data
    return (
        <>
           <NameInput
                name={name}
                valid={valid.name}
                defaultName={defaultName}
                update={update}
                validate={validate} />
            <PotentialsView
                subitemId={subitemId}
                itemId={itemId} />
        </>
    )
}

export default React.memo(FCCard)