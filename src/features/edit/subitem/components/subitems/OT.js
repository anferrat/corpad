import React from 'react'
import PotentialsView from '../potentials/PotentialsView'
import WireView from '../WireView'
import NameInput from '../NameInput'

const OTCard = ({ data, itemId, subitemId, update, validate }) => {
    const { name, defaultName, valid, wireGauge, wireColor } = data
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
            <WireView
                update={update}
                wireColor={wireColor}
                wireGauge={wireGauge} />
        </>
    )
}

export default React.memo(OTCard)