import React from 'react'
import { View, StyleSheet } from 'react-native'
import MultimeterPlaceholder from './MultimeterPlaceholder'
import { globalStyle } from '../../../../../styles/styles'
import { scanIcon, activity } from '../../../../../components/Icons'
import { Button, Text } from '@ui-kitten/components'
import MultimeterListItem from './MultimeterListItem'


const UnpairedView = ({ scanning, scanDevices, scannedDevices, isBluetoothOn, pairDevice, pairingId, pairing }) => {
    return (
        <View style={globalStyle.card}>
            <View style={styles.container}>
                <MultimeterPlaceholder />
                <Button
                    disabled={pairing || scanning || !isBluetoothOn}
                    style={styles.scanButton}
                    accessoryLeft={isBluetoothOn ? (scanning || pairingId !== null ? activity : scanIcon) : null}
                    onPress={scanDevices}>
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
    }
})