import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Modal } from '@ui-kitten/components'
import ModalHeader from './ModalHeader'
import ModalIcon from './ModalIcon'
import ModalLabel from './ModalLabel'
import { PulseIndicator } from 'react-native-indicators'
import { basic700, control, primary } from '../../../../styles/colors'
import ModalButton from './ModalButton'
import { getModalTop } from '../../../../styles/dimensions'


const NfcModal = ({ visible, loading, status, size, reset, retry, handleTagErrorLink }) => {
    return (
        <Modal
            visible={visible}
            onBackdropPress={reset}
            backdropStyle={styles.backdrop}
            style={styles.modal}>
            <View
                style={styles.container}>
                <ModalHeader
                    size={size}
                    status={status}
                    loading={loading}
                    linkReady={Boolean(size)} />
                {!loading ? <>
                    <ModalIcon
                        status={status} />
                    <ModalLabel
                        handleTagErrorLink={handleTagErrorLink}
                        status={status} />
                </> :
                    <View
                        style={styles.indicator}>
                        <PulseIndicator
                            color={primary}
                            size={90} />
                    </View>
                }
                <ModalButton
                    retry={retry}
                    status={status}
                    reset={reset}
                    loading={loading} />
            </View>
        </Modal>
    )
}

export default NfcModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: control,
        borderRadius: 15,
        elevation: 5,
        padding: 24,
        borderWidth: 1,
        borderColor: basic700,
    },
    modal: {
        position: 'absolute',
        top: getModalTop(350),
        width: '80%',
        minWidth: 280,
        height: 350
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    indicator: {
        marginBottom: 12,
        minHeight: 130
    }
})