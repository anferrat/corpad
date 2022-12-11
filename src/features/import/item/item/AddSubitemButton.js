import React, { useState } from 'react'
import { AddReadingModal } from "../../../../components/AddReadingModal"
import Button from '../components/Button'

const AddSubitemButton = ({ itemType }) => {
    const [visible, setVisible] = useState(false)
    const showModal = React.useCallback(() => setVisible(true), [])
    const hideModal = React.useCallback(() => setVisible(false), [])

    return (
        <>
            <Button
                showModal={showModal}
                itemType={itemType}
                onSelect={(cardType) => {console.log(cardType)}} />
            <AddReadingModal
                visible={visible}
                hideModal={hideModal}
                onSelect={(cardType) => {console.log(cardType) }}
            />
        </>
    )
}

export default AddSubitemButton