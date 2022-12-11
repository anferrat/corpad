import React from 'react'
import Modal from './components/Modal'

export const AddReadingModal = ({ onSelect, visible, hideModal }) => {
    return (
        <>
            <Modal
                onSelect={onSelect}
                visible={visible}
                hideModal={hideModal} />
        </>
    )
}
