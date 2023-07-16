import { useCallback, useEffect, useRef, useState } from "react"
import { EventRegister } from "react-native-event-listeners"
import useModal from "../../../../hooks/useModal"
import { useSelector } from "react-redux"
import { getOnOffPotentialPair } from "../../../../app/controllers/survey/subitems/PotentialController"
import { MultimeterCycles, MultimeterMeasurementTypes, MultimeterSyncModes } from "../../../../constants/global"
import { errorHandler } from "../../../../helpers/error_handler"
import { addButtonPressListener, addPotentialListener, potentialCaptureSetup, stopPotentialCapture } from "../../../../app/controllers/MultimeterController"
import useOnOffCaptureActive from "./useOnOffCaptureActive"
import { ToastAndroid } from "react-native"

const initPotentialFields = [{ potentialId: null, name: null, cycle: null }]

const initValues = {
    [null]: null, //real time update
    [MultimeterCycles.ON]: 0.000, //on cycle update values recorded herer
    [MultimeterCycles.OFF]: 0.000 //of cycle here
}

const initField = {
    itemId: null,
    subitemId: null,
    measurementType: null,
}

const useMultimeterListener = () => {
    const activeMultimeter = useSelector(state => state.settings.activeMultimeter)
    const timeFix = useSelector(state => state.settings.timeAdjustment.timeFix)

    const { onOffCaptureActive, onOffCaptureToggleHandler } = useOnOffCaptureActive()

    const { paired, connected, id, multimeterType, syncMode, firstCycle, onTime, offTime } = activeMultimeter //active multimeter data to connect to MM

    const [field, setField] = useState(initField) // info reagarding item and subitem and reading type

    const [potentialFields, setPotentialFields] = useState(initPotentialFields) // potential fields (id, name and cycle) if capturing potentials

    const [values, setValues] = useState(initValues) //captured values

    const { visible, showModal, hideModal } = useModal(false) //modal visibility controls

    const [onHold, setOnHold] = useState(false)

    const [captureButtonPressed, setCaptureButtonPressed] = useState(false) //state tracker for physical button press, when pressed runs effect to capture data. Dont use onCapture directly to avoid subscribe/unsubscribe on every value change.

    const [setupCompleted, setSetupCompleted] = useState(setupCompleted) //tracks whether MM recieved BLE request to start capturimg data. Not a part of ready to capture, since we only want to send request twice (on modal mount and unmount)

    const modalVisible = useRef(false)
    //ready to capture - checks that minimum conditions are met in order for MM start accuiring data.
    const readyToCapture = Boolean(visible && paired && connected && id && field.subitemId && (initField.measurementType !== MultimeterMeasurementTypes.POTENTIALS || potentialFields[0].potentialId))

    const onOffCaptureAvailable = potentialFields.length === 2

    const noGps = syncMode === MultimeterSyncModes.GPS && !timeFix

    //syncMode for multimeter. if On/Off potentials fields are selected it allows to use syncMode from multimeter settings, all other cases only real time captuire mode is available
    const syncAvailable = onOffCaptureAvailable && onOffCaptureActive ?
        (noGps ? //if GPS sync selected but there is no timeFix rollback to Cycled mode
            MultimeterSyncModes.CYCLED : syncMode)
        : MultimeterSyncModes.REAL_TIME

    useEffect(() => {
        //Handles event from external field to capture data. Active when Multimeter is paired.
        const startListener = EventRegister.addEventListener('MULTIMETER_START_CAPTURE', ({ itemId, subitemId, potentialId, measurementType }) => {
            showModal()
            const eventHandler = async () => {
                if (measurementType === MultimeterMeasurementTypes.POTENTIALS) {
                    //In case of potential field, we want to get on/off pair (with same ref cell) if available, therefore requesting it from db
                    const pair = await getOnOffPotentialPair({ subitemId, potentialId })
                    if (pair.status === 200) {
                        //submit request to multimeter to initiate data capture. Includes request to connect to MM, and sendind byte data via BLE
                        const setup = await potentialCaptureSetup()
                        if (setup.status === 200) {
                            setSetupCompleted(true) //always set this flag, since we need to send stopCapture message to MM even if modal was closed before setup finished
                            if (modalVisible.current) {
                                setField({ itemId, subitemId, measurementType })
                                setPotentialFields(pair.response)
                            }
                        }
                        else {
                            hideModal()
                            if (modalVisible.current)
                                errorHandler(setup.status)
                        }
                    }
                    else {
                        hideModal()
                        if (modalVisible.current)
                            errorHandler(pair.status)
                    }
                }
                else {
                    //other types are not supported yet. Good idea to move this logic to app, to a separate controller that starts capture based on measurementType
                }
            }
            if (paired)
                eventHandler()
        })
        return () => {
            EventRegister.removeEventListener(startListener)
        }
    }, [paired])

    const onModalClose = useCallback(() => {
        //reset to init state on modal close
        hideModal()
        setField(initField)
        setPotentialFields(initPotentialFields)
        setValues(initValues)
        setOnHold(false)
        setSetupCompleted(false)
        setCaptureButtonPressed(false)
    }, [])

    const onPauseHandler = useCallback(() => setOnHold(true), [])

    const onResumeHandler = useCallback(() => setOnHold(false), [])

    useEffect(() => {
        //Capture listener. when ready to capture listens for MM values and updates value state
        let potentialListener
        if (readyToCapture)
            potentialListener = addPotentialListener(({ cycle, value }) => {
                if (!onHold)
                    setValues(state => ({
                        ...state,
                        [cycle]: value
                    }))
            }, { peripheralId: id, type: multimeterType, onTime, offTime, syncMode: syncAvailable, firstCycle })
        return () => {
            if (potentialListener)
                potentialListener.response()
        }
    }, [readyToCapture, id, multimeterType, onTime, offTime, syncAvailable, firstCycle, onHold])

    useEffect(() => {
        //captures physical Button press and sets flag captureButtonPress to true
        const buttonPressListener = addButtonPressListener(() => {
            if (visible)
                setCaptureButtonPressed(true)
        }, { peripheralId: id, type: multimeterType })
        return () => {
            if (buttonPressListener.response)
                buttonPressListener.response()
        }
    }, [visible, id, multimeterType])

    useEffect(() => {
        if (captureButtonPressed) {
            onCapture()
        }
    }, [captureButtonPressed, onCapture])

    useEffect(() => {
        if (modalVisible.current === false && setupCompleted)  //if setup just finished, but modal already closed
            setSetupCompleted(false)
        return () => {
            if (setupCompleted) //send requset to MM when user leaving the modal
                stopPotentialCapture({ id, multimeterType })
        }
    }, [setupCompleted])

    useEffect(() => {
        if (visible) {
            modalVisible.current = true
        }
        return () => {
            if (visible) {
                modalVisible.current = false
            }
        }
    }, [visible])

    const onCapture = useCallback(() => {
        if (setupCompleted && field.itemId && field.subitemId && field.measurementType) {
            ToastAndroid.showWithGravity('Captured', ToastAndroid.SHORT, ToastAndroid.CENTER)
            EventRegister.emit('MULTIMETER_CAPTURED_VALUES', {
                measurementType: field.measurementType,
                itemId: field.itemId,
                subitemId: field.subitemId,
                potentials: onOffCaptureActive && onOffCaptureAvailable ?
                    potentialFields.map(({ potentialId, cycle }) => ({
                        potentialId,
                        value: values[cycle]
                    })) :
                    [{ potentialId: potentialFields[0].potentialId, value: values[null] }]
            })
        }
        onModalClose()
    }, [values, field, potentialFields, onModalClose, onOffCaptureActive, onOffCaptureAvailable, setupCompleted])


    return {
        onTime,
        offTime,
        syncMode: syncAvailable,
        visible,
        onOffCaptureActive,
        onOffCaptureAvailable,
        values,
        measurementType: field.measurementType,
        onHold,
        setupCompleted,
        noGps,
        onOffCaptureToggleHandler,
        onModalClose,
        onPauseHandler,
        onResumeHandler,
        onCapture
    }
}

export default useMultimeterListener