import React, { useState } from 'react'
import { AddReadingModal } from '../../components/AddReadingModal'
import ControlButton from './components/ControlButton'
import { errorHandler } from '../../helpers/error_handler'
import { addSubitem } from '../../services/database/addSubitem'


const AddSubitemButton = ({ itemId, itemType, navigateToSubitem }) => {
    const [visible, setVisible] = useState(false)
    const showModal = React.useCallback(() => setVisible(true), [])
    const hideModal = React.useCallback(() => setVisible(false), [])

    const onSelectHandler = React.useCallback(async (cardType) => {
        const request = await addSubitem(itemType, itemId, cardType)
        if (request.status === 200)
            navigateToSubitem(request.result.subitemId, true, request.result.subitemType)
        else errorHandler(request.status)
    }, [itemType, itemId])

    if (itemType === 'TEST_POINT' || itemType === 'RECTIFIER')
        return (
            <>
                <ControlButton
                    label='Add'
                    icon='plus-circle'
                    onPress={itemType === 'TEST_POINT' ? showModal : onSelectHandler.bind(this, 'CT')} />
                <AddReadingModal
                    visible={visible}
                    hideModal={hideModal}
                    onSelect={onSelectHandler} />
            </>
        )
    else return null
}

export default AddSubitemButton