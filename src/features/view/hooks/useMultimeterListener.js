import { useCallback, useEffect, useState, useRef } from "react"
import Toast from "react-native-toast-message"
import { MultimeterButtonEvents, MultimeterCycles, MultimeterListenerEvents, MultimeterSyncModes, SubitemTypes } from "../../../constants/global"
import { addPropertyFieldListener, startPropertyFieldCapture, stopPropertyFieldCapture } from "../../../app/controllers/MultimeterController"
import { getActiveFields, getInitialValues, getUnit, getValue } from "../helpers/functions"
import { errorHandler } from "../../../helpers/error_handler"
import { useIsFocused } from "@react-navigation/native"
import { addAppStateListener } from "../../../app/controllers/AppController"
import { useSelector } from "react-redux"

const useMultimeterListener = ({
    potentialUnit,
    subitems,
    validatePotential,
    updatePotentialValue,
    updatePropertyValue,
    validateCouponCurrent,
    validateVoltageDrop,
    validateVoltage,
    validateVoltageDropForCircuit }) => {

    const isTimeSynced = useSelector(state => state.settings.timeSync.isSynced)
    const isAvailable = useSelector(state => state.settings.activeMultimeter.connected && !state.settings.activeMultimeter.connecting)
    const [selectedField, setSelectedField] = useState(null)
    const [setupParams, setSetupParams] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isFocused = useIsFocused()
    const recordCapturedValues = useRef(false)

    const componentMounted = useRef(true)

    const isListenerActive = Boolean(setupParams) && isFocused && isAvailable

    const isCaptureActive = selectedField !== null

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    const onMultimeterPress = useCallback(async (mType, property, subitemId, subitemIndex, subitemType, potentialId, potentialIndex) => {
        if (!isAvailable)
            return errorHandler(853)
        if (isLoading) {
            return
        }

        if (!isCaptureActive) {
            setSelectedField({
                mType,
                property,
                subitemId,
                subitemIndex,
                potentialId,
                potentialIndex,
                subitemType
            })
            setIsLoading(true)
        }
        else {
            recordCapturedValues.current = true
            setSelectedField(null)
            setSetupParams(null)
        }
    }, [isCaptureActive, isLoading, isAvailable])

    useEffect(() => {
        if (isCaptureActive) {
            const loadSetupParams = async () => {
                const { mType, potentialId, subitemId } = selectedField
                const { response, status } = await startPropertyFieldCapture(mType, potentialId, subitemId)
                if (status === 200) {
                    const noFix = response.syncMode === MultimeterSyncModes.GPS && !isTimeSynced
                    setSetupParams({
                        ...response,
                        syncMode: noFix ? MultimeterSyncModes.HIGH_LOW : response.syncMode,
                        noFix
                    })
                    if (!componentMounted.current) {
                        stopPropertyFieldCapture((er) => { })
                    }
                }
                else {
                    status !== 101 ? errorHandler(status) : null
                    setIsLoading(false)
                    setSelectedField(null)
                }
            }
            loadSetupParams()
        }
    }, [isCaptureActive])

    useEffect(() => {
        let listener
        let appState
        let activeFields
        let initValues
        let currentValues
        if (isListenerActive) {
            const {
                peripheralId,
                type,
                onTime,
                offTime,
                onPotentialId,
                offPotentialId,
                isSingleRead,
                firstCycle,
                onSetup,
                offDelay,
                syncMode,
                mode,
                range,
                captureRate,
                noFix
            } = setupParams
            activeFields = getActiveFields(selectedField, onPotentialId, offPotentialId, subitems)

            initValues = getInitialValues(activeFields, subitems)
            currentValues = initValues.map(v => v)
            const unit = getUnit(selectedField.property, potentialUnit)

            //value listener
            listener = addPropertyFieldListener(
                (eventType, reading) => onUpdate(eventType, reading, activeFields, currentValues),
                (er) => {
                    errorHandler(er.code ?? 100)
                    setSetupParams(null)
                },
                peripheralId, type, onTime, offTime, isSingleRead, firstCycle, onSetup, offDelay, syncMode, unit, mode, range, captureRate, selectedField.mType)
            //
            appState = addAppStateListener(() => setSetupParams(null))
            Toast.show({
                type: 'multimeterCaptureToast',
                position: 'top',
                autoHide: false,
                swipeable: false,
                props: {
                    onTime,
                    offTime,
                    multimeterType: type,
                    mType: selectedField.mType,
                    firstCycleOn: firstCycle === MultimeterCycles.ON,
                    syncMode: syncMode,
                    noFix,
                    isSingleRead: isSingleRead
                }
            })
            setIsLoading(false)
        }
        return () => {
            Toast.hide()
            if (appState)
                appState.remove()
            if (listener) {
                listener.remove()
            }
            if (recordCapturedValues.current) {
                recordCapturedValues.current = false
                if (activeFields && currentValues && subitems && componentMounted.current)
                    onCapture(activeFields, subitems, currentValues)
            }
            else {
                if (activeFields && currentValues && subitems && componentMounted.current)
                    updateActiveFieldValues(activeFields, initValues)
            }
            if (isListenerActive) {
                setSelectedField(null)
                setSetupParams(null)
                stopPropertyFieldCapture((er) => { })
            }
        }
    }, [isListenerActive])


    /*
    1. IMPORTANT - subitems values are needed inside this effect for proper DB updates, however if they change during MM capturing, the changes will be overriden if we capture.
    2. Therefore we need to reset listener when subitem is changed here. For now, there is no
    3. Also we need to remove listener an lost focus and app going inactive
    */

    const onUpdate = useCallback((eventType, reading, activeFields, currentValues) => {
        //convertion here
        switch (eventType) {
            case MultimeterListenerEvents.SINGLE_READ:
            case MultimeterListenerEvents.ON_READING:
                if (activeFields[0] && currentValues[0] !== undefined) {
                    currentValues[0] = getValue(reading)
                    updateProperty(activeFields[0].property, activeFields[0].subitemIndex, activeFields[0].potentialIndex, currentValues[0])
                }
                return
            case MultimeterListenerEvents.OFF_READING:
                if (activeFields[1] && currentValues[1] !== undefined) {
                    currentValues[1] = getValue(reading)
                    updateProperty(activeFields[1].property, activeFields[1].subitemIndex, activeFields[1].potentialIndex, currentValues[1])
                }
                return
            case MultimeterListenerEvents.BUTTON_PRESS:
                if (reading === MultimeterButtonEvents.MAIN_BUTTON_ON_PRESS) {
                    recordCapturedValues.current = true
                    if (componentMounted.current && isListenerActive)
                        setSetupParams(null)
                    return
                }
        }
    }, [setSelectedField, updateProperty, isListenerActive])

    const onCapture = useCallback(async (activeFields, subitems, currentValues) => {
        return await Promise.all([activeFields.map((activeField, index) => {
            switch (activeField.property) {
                case 'potential':
                case 'potentialAc':
                    const isAc = activeField.property === 'potentialAc'
                    return validatePotential(currentValues[index], potentialUnit, activeField.subitemIndex, activeField.potentialId, activeField.potentialIndex, isAc)
                case 'voltageDrop':
                    if (subitems[activeField.subitemIndex].type === SubitemTypes.CIRCUIT)
                        return validateVoltageDropForCircuit(activeField.subitemIndex, { ...subitems[activeField.subitemIndex], voltageDrop: currentValues[index] })
                    else
                        return validateVoltageDrop(activeField.subitemIndex, { ...subitems[activeField.subitemIndex], voltageDrop: currentValues[index] })
                case 'voltage':
                    return validateVoltage(activeField.subitemIndex, { ...subitems[activeField.subitemIndex], voltage: currentValues[index] })
                case 'current':
                    if (subitems[activeField.subitemIndex].type === SubitemTypes.COUPON)
                        return validateCouponCurrent(activeField.subitemIndex, { ...subitems[activeField.subitemIndex], current: currentValues[index] })
            }
        })])
    }, [validateVoltage, validateVoltageDrop, validatePotential, validateCouponCurrent, potentialUnit])

    const updateActiveFieldValues = useCallback((activeFields, values) => {
        values.forEach((value, i) => updateProperty(activeFields[i].property, activeFields[i].subitemIndex, activeFields[i].potentialIndex, value))
    }, [updateProperty])

    const updateProperty = useCallback((property, subitemIndex, potentialIndex, value) => {
        if (property === 'potential' || property === 'potentialAc')
            updatePotentialValue(value, subitemIndex, potentialIndex)
        else
            updatePropertyValue(value, subitemIndex, property)
    }, [updatePropertyValue, updatePotentialValue])

    return {
        selectedCaptureField: selectedField,
        isCaptureLoading: isLoading,
        onMultimeterPress
    }
}


export default useMultimeterListener