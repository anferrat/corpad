import React from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { Button, Icon, Text } from '@ui-kitten/components'
import { basic400, primary } from '../../../../styles/colors'
import ModalContent from './ModalContent'
import useModal from '../../../../hooks/useModal'

const SelectFileView = (props) => {
    const { showModal, hideModal, visible } = useModal(false)
    return (
        <>
            <Text style={styles.title}>SELECT FILE</Text>
            <View style={styles.mainView}>
                <Icon
                    style={styles.icon}
                    fill={primary}
                    name='download-outline' />
                <Text
                    appearance={'hint'}
                    style={styles.text}
                    category='s1'>
                    Supported formats (.xlsx, .csv)
                    <Button
                        onPress={showModal}
                        appearance='ghost'>
                        Learn about file formatting
                    </Button>
                </Text>

                {props.children}
            </View>
            <Modal
                animationType='slide'
                onDismiss={hideModal}
                visible={visible}>
                <ModalContent
                    hideModal={hideModal} />
            </Modal>
        </>
    )
}

export default SelectFileView

const styles = StyleSheet.create({
    mainView: {
        margin: 12,
        marginTop: 0,
        paddingVertical: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: basic400,
        borderStyle: 'dashed'
    },
    title: {
        margin: 12,
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        margin: 12,
        textAlign: 'center'
    },
    icon: {
        width: 50,
        height: 50,
    },
})