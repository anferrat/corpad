import React from 'react'
import { Button } from '@ui-kitten/components'
import { addIcon } from '../../../../components/Icons'
import { sendRequest } from '../../../../api/database/index'
import idGen from '../../../../helpers/id_generator'
import { errorHandler } from '../../../../helpers/error_handler'

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