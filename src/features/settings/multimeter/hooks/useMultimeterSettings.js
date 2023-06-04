import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { startMultimeterScan, stopMultimeterScan, multimeterScanListener, multimeterStopScanListener } from '../../../../app/controllers/MultimeterController'
import { setBluetoothScanning } from '../../../../store/actions/settings'

const useMultimeterSettings = () => {
    const dispatch = useDispatch()
    const activeMultimiter = useSelector(state => state.settings.activeMultimeter)
    const isBluetoothOn = useSelector(state => state.settings.bluetooth.isBluetoothOn)
    const scanning = useSelector(state => state.settings.bluetooth.scanning)
    const [scannedDevices, setScannedDevices] = useState([])


    const scanDevices = useCallback(async () => {
        if (!scanning) {

            const { response, status, errorMessage } = await startMultimeterScan()
            console.log('Scan started', response, status, errorMessage)
            if (status === 200) {
                dispatch(setBluetoothScanning(true))
            }
        }
    }, [scanning])

    useEffect(() => {
        const deviceListener = multimeterScanListener((id, name, type, rssi) => {
            console.log(id, name, type, rssi)
        })

        console.log('Device ', deviceListener.status, deviceListener.response, deviceListener.errorMessage)

        const stopScan = multimeterStopScanListener(() => {
            dispatch(setBluetoothScanning(false))
        })
        console.log('Stop ', stopScan.status, stopScan.response, stopScan.errorMessage)

        return () => {
            if (deviceListener.response)
                deviceListener.response.remove()
            if (stopScan.response)
                stopScan.response.remove()
        }
    }, [])

    return {
        scanDevices,
        scanning
    }

}

export default useMultimeterSettings