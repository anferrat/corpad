import React from 'react'
import { Modal, StyleSheet } from 'react-native'
import ModalContent from './ModalContent'

const AddReadingModal = (props) => (
    <Modal
        style={styles.modal}
        animationType="slide"
        statusBarTranslucent={true}
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

export default React.memo(AddReadingModal)

const styles = StyleSheet.create({
    modal:
    {
        flex: 1
    }
})