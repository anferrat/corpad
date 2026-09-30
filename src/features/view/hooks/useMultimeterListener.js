import { useCallback, useEffect, useState, useRef } from "react"
import Toast from "react-native-toast-message"
import { MultimeterButtonEvents, MultimeterCycles, MultimeterListenerEvents, MultimeterSyncModes, SubitemTypes } from "../../../constants/global"
import { addPropertyFieldListener, startPropertyFieldCapture, stopPropertyFieldCapture } from "../../../app/controllers/MultimeterController"
import { getActiveFields, getInitialValues, getUnit, getValue } from "../helpers/functions"
import { errorHandler } from "../../../helpers/error_handler"
import { useIsFocused } from "@react-navigation/native"
import { addAppStateListener } from "../../../app/controllers/AppController"
import { useDispatch, useSelector } from "react-redux"
import { setActiveMultimeterExecuting } from "../../../store/actions/settings"
import { getMultimeterModeLimit } from "../../../helpers/functions"

const isActiveFieldAvailable = (activeField, subitems) => {
    const subitem = subitems?.[activeField.subitemIndex]
    if (!subitem || subitem.id !== activeField.subitemId)
        return false

    if (activeField.property === 'potential' || activeField.property === 'potentialAc')
        return subitem.potentials?.[activeField.potentialIndex] !== undefined

    return Object.prototype.hasOwnProperty.call(subitem, activeField.property)
}

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
    const toggleStatus = useSelector(state => state.settings.activeMultimeter.toggleStatus)
    const isAvailable = useSelector(state => state.settings.activeMultimeter.connected && !state.settings.activeMultimeter.connecting && !state.settings.activeMultimeter.executing && state.settings.activeMultimeter.toggleStatus !== null)
    const [selectedField, setSelectedField] = useState(null)
    const [setupParams, setSetupParams] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const recordCapturedValues = useRef(false)

    const componentMounted = useRef(true)
    const subitemsRef = useRef(subitems)

    const isListenerActive = Boolean(setupParams) && isFocused && isAvailable

    const isCaptureActive = selectedField !== null

    const resetCapture = useCallback(() => {
        setSelectedField(null)
        setSetupParams(null)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    useEffect(() => {
        subitemsRef.current = subitems
    }, [subitems])

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
        let cancelled = false

        if (isCaptureActive) {
            if (!isAvailable || !isFocused) {
                resetCapture()
                return () => {
                    cancelled = true
                }
            }

            const loadSetupParams = async () => {
                const { mType, potentialId, subitemId } = selectedField
                const { response, status } = await startPropertyFieldCapture(mType, potentialId, subitemId, toggleStatus)
                if (cancelled || !componentMounted.current) {
                    if (status === 200 && response)
                        stopPropertyFieldCapture(response.isSingleRead, () => { })
                    return
                }
                if (status === 200 && response) {
                    const noFix = response.syncMode === MultimeterSyncModes.GPS && !isTimeSynced
                    setSetupParams({
                        ...response,
                        syncMode: noFix ? MultimeterSyncModes.HIGH_LOW : response.syncMode,
                        noFix
                    })
                }
                else {
                    status !== 101 ? errorHandler(status ?? 851) : null
                    resetCapture()
                }
            }
            loadSetupParams()
        }
        return () => {
            cancelled = true
        }
    }, [isAvailable, isCaptureActive, isFocused, isTimeSynced, resetCapture, selectedField, toggleStatus])

    useEffect(() => {
        let listener
        let appState
        let activeFields
        let initValues
        let currentValues
        let isSingle
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
            if (!activeFields.every(activeField => isActiveFieldAvailable(activeField, subitems))) {
                errorHandler(851)
                stopPropertyFieldCapture(isSingleRead, () => { })
                resetCapture()
                return
            }
            isSingle = isSingleRead
            initValues = getInitialValues(activeFields, subitems)
            currentValues = initValues.map(v => v)
            const unit = getUnit(selectedField.property, potentialUnit)

            //value listener
            listener = addPropertyFieldListener(
                (eventType, reading) => onUpdate(eventType, reading, activeFields, currentValues),
                (er) => {
                    errorHandler(er?.code ?? 100)
                    resetCapture()
                },
                peripheralId, type, onTime, offTime, isSingleRead, firstCycle, onSetup, offDelay, syncMode, unit, mode, range, captureRate, selectedField.mType, toggleStatus)
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
                    isSingleRead: isSingleRead,
                    limit: getMultimeterModeLimit(mode, toggleStatus)
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
                dispatch(setActiveMultimeterExecuting(true))
                stopPropertyFieldCapture(isSingle, (er) => { }).finally(() => dispatch(setActiveMultimeterExecuting(false)))
            }
        }
        // Keep the captured subitems and callbacks stable until capture cleanup.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListenerActive, resetCapture])


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
    }, [updateProperty, isListenerActive])

    const onCapture = useCallback(async (activeFields, capturedSubitems, currentValues) => {
        return await Promise.all([activeFields.map((activeField, index) => {
            const subitem = capturedSubitems?.[activeField.subitemIndex]
            if (!subitem || subitem.id !== activeField.subitemId || !isActiveFieldAvailable(activeField, subitemsRef.current))
                return null

            switch (activeField.property) {
                case 'potential':
                case 'potentialAc':
                    const isAc = activeField.property === 'potentialAc'
                    return validatePotential(currentValues[index], potentialUnit, activeField.subitemIndex, activeField.potentialId, activeField.potentialIndex, isAc)
                case 'voltageDrop':
                    if (subitem.type === SubitemTypes.CIRCUIT)
                        return validateVoltageDropForCircuit(activeField.subitemIndex, { ...subitem, voltageDrop: currentValues[index] })
                    else
                        return validateVoltageDrop(activeField.subitemIndex, { ...subitem, voltageDrop: currentValues[index] })
                case 'voltage':
                    return validateVoltage(activeField.subitemIndex, { ...subitem, voltage: currentValues[index] })
                case 'current':
                    if (subitem.type === SubitemTypes.COUPON)
                        return validateCouponCurrent(activeField.subitemIndex, { ...subitem, current: currentValues[index] })
            }
        })])
    }, [validateVoltage, validateVoltageDrop, validatePotential, validateCouponCurrent, validateVoltageDropForCircuit, potentialUnit])

    const updateActiveFieldValues = useCallback((activeFields, values) => {
        values.forEach((value, i) => {
            if (value !== undefined && activeFields[i])
                updateProperty(activeFields[i].property, activeFields[i].subitemIndex, activeFields[i].potentialIndex, value)
        })
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
