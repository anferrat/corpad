import React, { useState } from 'react'
import { AddReadingModal } from "../../../components/AddReadingModal"
import Button from './components/Button'
import { errorHandler } from "../../../helpers/error_handler"
import { addSubitem } from '../../../services/database/addSubitem'

const AddButton = ({ itemType, navigateToSubitem, itemId }) => {
    const [visible, setVisible] = useState(false)
    const showModal = React.useCallback(() => setVisible(true), [])
    const hideModal = React.useCallback(() => setVisible(false), [])

    const onSelectHandler = React.useCallback(async (cardType) => {
        const request = await addSubitem(itemType, itemId, cardType)
        if (request.status === 200)
            navigateToSubitem(request.result.subitemId, true, request.result.subitemType)
        else errorHandler(request.status)
    }, [itemType, itemId])

    return (
        <>
            <Button
                onPress={itemType === 'TEST_POINT' ? showModal : onSelectHandler.bind(this, 'CT')}
                itemType={itemType} />
            <AddReadingModal
                visible={visible}
                hideModal={hideModal}
                onSelect={onSelectHandler}
            />
        </>
    )
}

export default AddButton