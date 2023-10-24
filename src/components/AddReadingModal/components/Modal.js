import React from 'react'
import { StyleSheet, Modal } from 'react-native'
import ModalContent from './ModalContent'
import { control } from '../../../styles/colors'

const AddReadingModal = ({ hideModal, visible, onSelect, subitemTypes }) => {
    return (
        <>
            <Modal
                animationType='slide'
                statusBarTranslucent={true}
                style={styles.modal}
                onRequestClose={hideModal}
                visible={visible}>
                <ModalContent
                    subitemTypes={subitemTypes}
                    onSelect={onSelect}
                    hideModal={hideModal} />
            </Modal>
        </>
    )
}

export default React.memo(AddReadingModal)

const styles = StyleSheet.create({
    modal:
    {
        flex: 1,
        backgroundColor: control
    }
})