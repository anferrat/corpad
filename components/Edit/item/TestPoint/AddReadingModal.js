import React from 'react'
import { Modal, StyleSheet } from 'react-native'
import ModalContent from './ModalContent'

const AddReadingModal = (props) => (
    <Modal
        style={styles.modal}
        animationType="slide"
        hardwareAccelerated={true}
        onRequestClose={props.closeModal}
        visible={props.visible}>
        <ModalContent
            testPointType={props.testPointType}
            testPointId={props.testPointId}
            closeModal={props.closeModal}
            navigateToCard={props.navigateToCard} />
    </Modal>
)

export default AddReadingModal

const styles = StyleSheet.create({
    modal:
    {
        flex: 1
    }
})