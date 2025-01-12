import { useCallback, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { startMultimeterScan, stopMultimeterScan, multimeterScanListener, multimeterStopScanListener, pairMultimeter, checkConnectedDevices } from '../../../../../app/controllers/MultimeterController'
import { addBluetoothStatusListener } from '../../../../../app/controllers/AppController'
import { setActiveMultimeter, showPaywall } from '../../../../../store/actions/settings'
import { errorHandler } from '../../../../../helpers/error_handler'
import useModal from '../../../../../hooks/useModal'
import { hapticMedium } from '../../../../../native_libs/haptics'
import { isProStatus } from '../../../../../helpers/functions'

const initialState = []

const useMultimeterScan = ({ initialBleState }) => {
    const dispatch = useDispatch()
    const connecting = useSelector(state => state.settings.activeMultimeter.connecting)
    const isPro = useSelector(state => isProStatus(state.settings.subscription.status))

    const [isBluetoothOn, setIsBluetoothOn] = useState(initialBleState)
    const [scannedDevices, setScannedDevices] = useState(initialState)
    const [connectedDevices, setConnectedDevices] = useState(initialState)
    const [pairingId, setPairingId] = useState(null)
    const [scanning, setScanning] = useState(false)
    const { showModal, hideModal, visible } = useModal(false)

    const scanningRef = useRef(false)
    const componentMounted = useRef(true)

    const onPaywallShow = useCallback(() => {
        dispatch(showPaywall())
    }, [])

    useEffect(() => {
        componentMounted.current = true
        //Listen for devices
        const deviceListener = multimeterScanListener((id, name, type, rssi) => {
            setScannedDevices(state => {
                const exists = ~state.findIndex(device => device.id === id)
                if (!exists)
                    return state.concat({ id, name, type, rssi })
                else return state
            })
        })

        //listen for stop scan
        const stopScan = multimeterStopScanListener(() => {
            setScanning(false)
            scanningRef.current = false
        })

        //listen for bluetooth status change
        const bluetoothListener = addBluetoothStatusListener(isOn => setIsBluetoothOn(isOn))


        return () => {
            componentMounted.current = false
            if (stopScan.response)
                stopScan.response.remove()
            if (bluetoothListener.response)
                bluetoothListener.response.remove()
            if (deviceListener.response)
                deviceListener.response.remove()
            if (scanningRef.current)
                stopMultimeterScan()
        }
    }, [])


    const pairDevice = useCallback(async (id, name, multimeterType) => {
        if (pairingId === null) {
            setPairingId(id)
            const stopScan = scanningRef.current ? await stopMultimeterScan() : { status: 200 }
            if (stopScan.status === 200) {
                const { status } = await pairMultimeter({ id, multimeterType, name })
                if (status === 200) {
                    dispatch(setActiveMultimeter(true, id, name, multimeterType))
                    hapticMedium()
                }
                else if (componentMounted.current)
                    errorHandler(status)
            }
            else if (componentMounted.current)
                errorHandler(stopScan.status)
            if (componentMounted.current)
                setPairingId(null)
        }
    }, [setPairingId, pairingId, dispatch])

    const scanDevices = useCallback(async () => {
        hideModal()
        if (!scanning && isBluetoothOn && !connecting) {
            setScanning(true)
            setConnectedDevices(initialState)
            await checkConnectedDevices(
                null,
                alreadyConnected => setConnectedDevices(alreadyConnected)
            )
            const { status } = await startMultimeterScan()
            if (status === 200) {
                if (componentMounted.current) {
                    setScannedDevices(initialState)
                    scanningRef.current = true
                }
            }
            else if (componentMounted.current) {
                setScanning(false)
                errorHandler(status)
            }
        }
    }, [scanning, isBluetoothOn, connecting])

    const onShowModal = useCallback(() => isPro ? showModal() : onPaywallShow(), [isPro])

    return {
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
        showModal: onShowModal,
        hideModal,
    }

}

export default useMultimeterScan