import React from 'react'
import { addIcon } from '../../../_Stateless/Icons'
import { Button } from '@ui-kitten/components'
import { sendRequest } from '../../../../database/db'
import idGen from '../../../IdGen'
import { errorHandler } from '../../../errorHandler'

const AddCircuitButton = (props) => {
    const addCircuitHandler = async (rectifierId) => {
        const circuitId = await sendRequest('INSERT', 'CIRCUIT', { uid: idGen(), timeCreated: Date.now(), rectifierId: rectifierId })
        if (circuitId.status === 200)
            props.navigateToCircuit(circuitId.result, true, 'CT')
        else errorHandler(605)
    }
    return (
        <Button
            onPress={addCircuitHandler.bind(this, props.rectifierId)}
            style={{ height: 60 }}
            accessoryLeft={addIcon}
            appearance='ghost'>Add circuit</Button>
    )
}

export default React.memo(AddCircuitButton)