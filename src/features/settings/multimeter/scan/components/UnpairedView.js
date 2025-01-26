import React from 'react'
import { View, StyleSheet } from 'react-native'
import MultimeterPlaceholder from './MultimeterPlaceholder'
import { globalStyle } from '../../../../../styles/styles'
import { scanIcon, activity, star } from '../../../../../components/Icons'
import { Button, Text } from '@ui-kitten/components'
import MultimeterListItem from './MultimeterListItem'
import ConnectMultimeterModal from './ConnectMultimeterModal'
import useMultimeterScan from '../hooks/useMultimeterScan'


const UnpairedView = ({ initialBleState }) => {
    const {
        visible,
        isPro,
        scannedDevices,
        connectedDevices,
        scanning,
        isBluetoothOn,
        pairingId,
        connecting,
        scanDevices,
        pairDevice,
        showModal,
        hideModal
    } = useMultimeterScan({ initialBleState })
    return (
        <View style={globalStyle.card}>
            <View style={styles.container}>
                <MultimeterPlaceholder />
                <Button
                    appearance={isPro ? 'filled' : 'ghost'}
                    disabled={connecting || scanning || !isBluetoothOn || pairingId !== null}
                    style={styles.scanButton}
                    accessoryLeft={(isBluetoothOn ? (!isPro ? star : (scanning || pairingId !== null ? activity : scanIcon)) : null)}
                    onPress={showModal}>
                    {isBluetoothOn ? (!isPro ? 'Upgrade to premium' : (pairingId !== null ? 'Pairing' : (scanning ? 'Searching for multimeters' : 'Search for multimeters'))) : 'Bluetooth is off'}</Button>
                {connectedDevices.length !== 0 ?
                    <View
                        style={styles.devices}>
                        <Text
                            style={styles.text}
                            appearance='hint'
                            category='label'>
                            Connected with another app (unavailable)
                        </Text>
                        {connectedDevices.map(({ id, name, type }, index) => (
                            <MultimeterListItem
                                key={index}
                                id={id}
                                pairing={false}
                                name={name}
                                type={type}
                                onPress={null}
                                disabled={true}
                            />
                        ))}
                    </View> : null}
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
                                onPress={pairDevice}
                                disabled={false}
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
    },
    hint: {

    }

})