import React from 'react'
import { View, StyleSheet } from 'react-native'
import MultimeterPlaceholder from './MultimeterPlaceholder'
import { globalStyle } from '../../../../../styles/styles'
import { scanIcon, activity } from '../../../../../components/Icons'
import { Button, Icon, Modal, Text } from '@ui-kitten/components'
import MultimeterListItem from './MultimeterListItem'
import { control } from '../../../../../styles/colors'

const accessory = (props) => <Icon {...props} name='arrow-circle-right' />

const UnpairedView = ({ scanning, scanDevices, scannedDevices, isBluetoothOn, pairDevice, pairingId, pairing, showModal, hideModal, visible }) => {
    return (
        <View style={globalStyle.card}>
            <View style={styles.container}>
                <MultimeterPlaceholder />
                <Button
                    disabled={pairing || scanning || !isBluetoothOn}
                    style={styles.scanButton}
                    accessoryLeft={isBluetoothOn ? (scanning || pairingId !== null ? activity : scanIcon) : null}
                    onPress={showModal}>
                    {isBluetoothOn ? (pairingId !== null ? 'Pairing' : (scanning ? 'Searching for multimeters' : 'Search for multimeters')) : 'Bluetooth is off'}</Button>
                {scannedDevices.length !== 0 ?
                    <View style={{ flex: 1, justifyContent: 'flex-start', width: '100%' }}>
                        <Text
                            style={styles.text}
                            appearance='hint'
                            category='label'>
                            Available devices
                        </Text>
                        {scannedDevices.map(({ id, name, type }) => (
                            <MultimeterListItem
                                key={id}
                                id={id}
                                pairing={pairingId === id}
                                name={name}
                                type={type}
                                pair={pairDevice}
                            />
                        ))}
                    </View> : null}
            </View>
            <Modal
                style={styles.modal}
                backdropStyle={styles.backdrop}
                onBackdropPress={hideModal}
                visible={visible}>
                <Text
                    style={styles.hint}>
                    Press the physical button on your multimeter, and subsequently, select "Continue."</Text>
                <Button
                    accessoryRight={accessory}
                    onPress={scanDevices}>
                    Continue
                </Button>
            </Modal>
        </View>
    )
}

export default UnpairedView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanButton: {
        marginBottom: 24,
        width: 250,
        height: 50
    },
    text: {
        paddingBottom: 6
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        width: '80%',
        height: 140,
        backgroundColor: control,
        padding: 12,
        borderRadius: 10,
        justifyContent: 'center'
    },
    hint: {
        paddingBottom: 24,
        textAlign: 'center'
    }
})