import React, { useState } from 'react'
import AddReadingModal from '../Edit/item/TestPoint/AddReadingModal'
import ControlButton from '../_Stateless/ViewItem/ControlButton'
import idGen from '../IdGen'
import { sendRequest } from '../../database/db'
import { errorHandler } from '../errorHandler'
import { testPointReadingOptions } from '../../constants/constants'


const AddSubitemButton = (props) => {
    const [showModal, setShowModal] = useState(false)

    const addCircuit = React.useCallback(async () => {
        const circuitId = await sendRequest('INSERT', 'CIRCUIT', { uid: idGen(), timeCreated: Date.now(), rectifierId: props.itemId })
        if (circuitId.status === 200)
            props.navigateToSubitem(circuitId.result, true, 'CT')
        else errorHandler(605)
    }, [props.navigateToSubitem, props.itemId])

    switch (props.dataType) {
        case 'TEST_POINT':
            if (testPointReadingOptions[props.testPointType] && testPointReadingOptions[props.testPointType].length > 0)
                return (
                    <>
                        <ControlButton
                            label='Add'
                            icon='plus-circle'
                            onPress={setShowModal.bind(this, true)} />
                        <AddReadingModal
                            testPointType={props.testPointType}
                            navigateToCard={props.navigateToSubitem}
                            visible={showModal}
                            closeModal={setShowModal.bind(this, false)}
                            testPointId={props.itemId} />
                    </>
                )
            else return null
        case 'RECTIFIER':
            return (
                <ControlButton
                    label='Add'
                    icon='plus-circle'
                    onPress={addCircuit} />
            )
        default:
            return null
    }

}

export default AddSubitemButton