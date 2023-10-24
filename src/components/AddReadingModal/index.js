import React from 'react'
import Modal from './components/Modal'

export const AddReadingModal = ({ onSelect, visible, hideModal, subitemTypes }) => {
    return (
        <>
            <Modal
                subitemTypes={subitemTypes}
                onSelect={onSelect}
                visible={visible}
                hideModal={hideModal} />
        </>
    )
}
