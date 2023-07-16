import React from 'react'
import useActiveMultimeter from './hooks/useActiveMultimeter'
import { ScrollView } from 'react-native-gesture-handler'
import UnpairedView from './components/UnpairedView'
import PairedView from './components/PairedView'


const Multimeter = ({ navigateToMultimeterCycleSettings }) => {
    const { scanning, scanDevices, activeMultimeter, scannedDevices, isBluetoothOn, pairDevice, unpairDevice, connecting, pairingId, connectToActiveMultimeter, pairing, hideModal, showModal, visible } = useActiveMultimeter()
    const { multimeterType, paired, connected, name } = activeMultimeter
    return (
        <ScrollView>
            {paired ?
                <PairedView
                    navigateToCycleSettings={navigateToMultimeterCycleSettings}
                    name={name}
                    type={multimeterType}
                    connected={connected}
                    connecting={connecting}
                    connect={connectToActiveMultimeter}
                    unpair={unpairDevice}
                /> :
                <UnpairedView
                    hideModal={hideModal}
                    showModal={showModal}
                    visible={visible}
                    scanning={scanning}
                    scanDevices={scanDevices}
                    scannedDevices={scannedDevices}
                    isBluetoothOn={isBluetoothOn}
                    pairDevice={pairDevice}
                    pairingId={pairingId}
                    pairing={pairing}
                />
            }
        </ScrollView>
    )
}

export default Multimeter

