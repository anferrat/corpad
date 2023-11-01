import React from 'react'
import { View, StyleSheet } from 'react-native'
import MultimeterPlaceholder from './MultimeterPlaceholder'
import { globalStyle } from '../../../../../styles/styles'
import { scanIcon, activity, pricetags } from '../../../../../components/Icons'
import { Button, Text } from '@ui-kitten/components'
import MultimeterListItem from './MultimeterListItem'
import ConnectMultimeterModal from './ConnectMultimeterModal'


const UnpairedView = ({ scanning, scanDevices, scannedDevices, isBluetoothOn, pairDevice, pairingId, pairing, showModal, hideModal, visible, isPro }) => {
    return (
        <View style={globalStyle.card}>
            <View style={styles.container}>
                <MultimeterPlaceholder />
                <Button
                    status={isPro ? 'primary' : 'basic'}
                    disabled={pairing || scanning || !isBluetoothOn}
                    style={styles.scanButton}
                    accessoryLeft={!isPro ? pricetags : (isBluetoothOn ? (scanning || pairingId !== null ? activity : scanIcon) : null)}
                    onPress={showModal}>
                    {isPro ? (isBluetoothOn ? (pairingId !== null ? 'Pairing' : (scanning ? 'Searching for multimeters' : 'Search for multimeters')) : 'Bluetooth is off') : 'Upgrade to premium'}</Button>
                {scannedDevices.length !== 0 ?
                    <View
                        style={styles.devices}>
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
            <ConnectMultimeterModal
                onConnectRequest={scanDevices}
                visible={visible}
                hideModal={hideModal} />
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
    devices: {
        flex: 1,
        justifyContent:
            'flex-start', width:
            '100%'
    }

})