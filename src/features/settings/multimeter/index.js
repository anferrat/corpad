import React from 'react'
import { View, StyleSheet } from 'react-native'
import useActiveMultimeter from './hooks/useActiveMultimeter'
import { Button, Text } from '@ui-kitten/components'
import { globalStyle } from '../../../styles/styles'
import MultimeterListItem from './components/MultimeterListItem'
import PairedMultimeterView from './components/PairedMultimeterView'
import { scanIcon, activity } from '../../../components/Icons'
import MultimeterSettings from './MultimeterSettings'
import { ScrollView } from 'react-native-gesture-handler'


const Multimeter = () => {
    const { scanning, scanDevices, activeMultimeter, scannedDevices, isBluetoothOn, pairDevice, unpairDevice, connecting, pairingId, connectToActiveMultimeter } = useActiveMultimeter()
    const { multimeterType, paired, connected, name } = activeMultimeter
    return (
        <ScrollView>
            <View style={globalStyle.card}>
                <PairedMultimeterView
                    type={multimeterType}
                    name={name}
                    connect={connectToActiveMultimeter}
                    unpair={unpairDevice}
                    connected={connected}
                    connecting={connecting}
                    paired={paired} />
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
                <Button
                    style={styles.scanButton}
                    accessoryLeft={isBluetoothOn ? (scanning || pairingId !== null ? activity : scanIcon) : null}
                    onPress={scanDevices}
                    disabled={scanning || !isBluetoothOn || pairingId !== null}
                    appearance='ghost'>{isBluetoothOn ? (pairingId !== null ? 'Pairing' : (scanning ? 'Searching' : 'Search for multimeters')) : 'Bluetooth is off'}</Button>
            </View>
            <MultimeterSettings />
        </ScrollView>
    )
}

export default Multimeter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanButton: {
        marginBottom: -12,
        marginHorizontal: -12,
        height: 60
    },
    text: {
        marginBottom: 4
    }
})