import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Modal, Text, Button, Icon } from '@ui-kitten/components'
import { primary, control } from '../../../../../styles/colors'
import { getModalTop } from '../../../../../styles/dimensions'

const accessory = (props) => <Icon {...props} name='arrow-circle-right' />


const ConnectMultimeterModal = ({ onConnectRequest, hideModal, visible }) => {
    return (
        <Modal
            style={styles.modal}
            backdropStyle={styles.backdrop}
            onBackdropPress={hideModal}
            visible={visible}>
            <View style={styles.header}>
                <Icon name='radio' style={styles.icon} fill={primary} />
                <Text
                    category={'h6'}
                    style={styles.hint}>
                    Connect device</Text>
            </View>
            <Text
                style={styles.hint}>
                Press button on your multimeter and subsequently, select "Continue."</Text>
            <Button
                accessoryRight={accessory}
                onPress={onConnectRequest}>
                Continue
            </Button>
        </Modal>
    )
}

export default ConnectMultimeterModal

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        width: '80%',
        backgroundColor: control,
        padding: 24,
        borderRadius: 10,
        justifyContent: 'center',
        height: 220,
        position: 'absolute',
        top: getModalTop(220)
    },
    hint: {
        paddingBottom: 24,
        textAlign: 'center'
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 12
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 6
    }
})