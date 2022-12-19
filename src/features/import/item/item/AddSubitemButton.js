import React, { useState } from 'react'
import { AddReadingModal } from "../../../../components/AddReadingModal"
import Button from '../components/Button'

const AddSubitemButton = ({ itemType, onSelect }) => {
    const [visible, setVisible] = useState(false)
    const showModal = React.useCallback(() => setVisible(true), [])
    const hideModal = React.useCallback(() => setVisible(false), [])

    return (
        <>
            <Button
                showModal={showModal}
                itemType={itemType}
                onSelect={onSelect} />
            <AddReadingModal
                visible={visible}
                hideModal={hideModal}
                onSelect={onSelect}
            />
        </>
    )
}

export default AddSubitemButton