import React from 'react'
import { Modal, Text, Button } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { importIcon } from '../Icons'
import WarningDisplay from './WarningDisplay'

const ImportModal = (props) => {
    return <Modal
        style={styles.modal}
        backdropStyle={styles.backdrop}
        onBackdropPress={props.dismiss}
        visible={props.visible}>
        <View style={styles.mainView}>
            <Text category='h5'>Confirm import</Text>
            <Text category='p1' style={styles.text}>{props.itemCount} {props.itemType === 'TEST_POINT' ? 'test points' : (props.itemType === 'RECTIFIER' ? 'rectifiers' : 'pipelines')} will be created. Would you like to continue?</Text>
            <WarningDisplay warnings={props.warnings} />
            <View style={styles.buttonRow}>
                <Button onPress={props.dismiss} appearance='ghost' status={'basic'} style={styles.button}>Cancel</Button>
                <Button onPress={props.onImport} style={styles.button} accessoryLeft={importIcon}>Import</Button>
            </View>
        </View>
    </Modal>
}

export default ImportModal

const styles = StyleSheet.create({
    modal: {
        width: '90%',
        maxHeight: 450
    },
    mainView: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
        padding: 24,
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    button: {
        flex: 1,
        marginHorizontal: 6
    },
    text: {
        marginVertical: 12,
    },
    buttonRow: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})