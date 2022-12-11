import React from 'react'
import { Modal, StyleSheet } from 'react-native'
import ModalContent from './ModalContent'

const AddReadingModal = ({ hideModal, visible, onSelect }) => (
    <Modal
        style={styles.modal}
        animationType="slide"
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        onRequestClose={hideModal}
        visible={visible}>
        <ModalContent
            onSelect={onSelect}
            hideModal={hideModal} />
    </Modal>
)

export default React.memo(AddReadingModal)

const styles = StyleSheet.create({
    modal:
    {
        flex: 1
    }
})