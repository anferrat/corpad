import { useCallback, useEffect, useState, useRef } from "react"
import { CurrentUnits, MultimeterButtonEvents, MultimeterCycles, MultimeterListenerEvents, PotentialUnits, SubitemTypes } from "../../../constants/global"
import { findPotentialIndexById } from "../helpers/functions"
import { addPropertyFieldListener, startPropertyFieldCapture, stopPropertyFieldCapture } from "../../../app/controllers/MultimeterController"
import { errorHandler } from "../../../helpers/error_handler"
import { useIsFocused } from "@react-navigation/native"
import { addAppStateListener } from "../../../app/controllers/AppController"
import Toast from "react-native-toast-message"

const getActiveFields = (selectedField, onPotentialId, offPotentialId, subitems) => {
    const { potentialId, subitemIndex } = selectedField
    if (!potentialId || !onPotentialId || !offPotentialId)
        return [selectedField]
    else
        return [
            {
                ...selectedField,
                potentialId: onPotentialId,
                potentialIndex: findPotentialIndexById(subitems[subitemIndex], onPotentialId),
            },
            {
                ...selectedField,
                potentialId: offPotentialId,
                potentialIndex: findPotentialIndexById(subitems[subitemIndex], offPotentialId),
            }
        ]
}

const getInitialValues = (activeFields, subitems) => {
    return activeFields.map(({ subitemIndex, potentialIndex, property }) => property === 'potential' ? subitems[subitemIndex].potentials[potentialIndex].value : subitems[subitemIndex][property])
}

const getUnit = (property, potentialUnit) => {
    switch (property) {
        case 'potential':
            return potentialUnit
        case 'voltageDrop':
            return PotentialUnits.MILIVOLTS
        case 'current':
            return CurrentUnits.MICRO_AMPS
        case 'voltage':
            return PotentialUnits.VOLTS
    }
}

const getValue = (reading) => {
    return reading.flag !== null ? reading.flag : reading.value
}

const useMultimeterListener = ({
    potentialUnit,
    subitems,
    validatePotential,
    updatePotentialValue,
    updatePropertyValue,
    validateCouponCurrent,
    validateVoltageDrop,
    validateVoltage }) => {

    //const isConnected = useSelector(state => state.settings.activeMultimeter.connected)
    const [selectedField, setSelectedField] = useState(null)
    const [setupParams, setSetupParams] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isFocused = useIsFocused()
    const recordCapturedValues = useRef(false)

    const componentMounted = useRef(true)

    const isListenerActive = Boolean(setupParams) && isFocused

    const isCaptureActive = selectedField !== null

    useEffect(() => {
        componentMounted.current = true
        return () => {
            componentMounted.current = false
        }
    }, [])

    const onMultimeterPress = useCallback(async (mType, property, subitemId, subitemIndex, potentialId, potentialIndex) => {
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
                potentialIndex
            })
            setIsLoading(true)
        }
        else {
            recordCapturedValues.current = true
            setSelectedField(null)
            setSetupParams(null)
        }
    }, [isCaptureActive, isLoading])

    useEffect(() => {
        if (isCaptureActive) {
            const loadSetupParams = async () => {
                const { mType, potentialId, subitemId } = selectedField
                const { response, status } = await startPropertyFieldCapture(mType, potentialId, subitemId)
                if (status === 200) {
                    setSetupParams(response)
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
                captureRate
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
    1. IMPORTANT - subitems are needed inside this effect for proper DB updates, however if they change during MM capturing, the changes will be overriden if we capture.
    2. Therefore we need to reset listener when subitem is changed here
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
                    return validatePotential(currentValues[index], potentialUnit, activeField.subitemIndex, activeField.potentialId, activeField.potentialIndex)
                case 'voltageDrop':
                    return validateVoltageDrop(activeField.subitemIndex, { ...subitems[activeField.subitemIndex], voltageDrop: currentValues[index] })
                case 'voltage':
                    return validateVoltage(activeField.subitemIndex, { ...subitems[activeField.subitemIndex], voltage: currentValues[index] })
                case 'current':
                    if (subitems[activeField.subitemIndex].type === SubitemTypes.COUPON)
                        return validateCouponCurrent(activeField.subitemIndex, { ...subitems[activeField.subitemIndex], current: currentValues[index] })
            }
        })])
    }, [validateVoltage, validateVoltageDrop, validatePotential, validateCouponCurrent, potentialUnit])

    const updateProperty = (property, subitemIndex, potentialIndex, value) => {
        property === 'potential' ?
            updatePotentialValue(value, subitemIndex, potentialIndex) :
            updatePropertyValue(value, subitemIndex, property)
    }

    const updateActiveFieldValues = useCallback((activeFields, values) => {
        values.forEach((value, i) => updateProperty(activeFields[i].property, activeFields[i].subitemIndex, activeFields[i].potentialIndex, value))
    }, [updateProperty])

    return {
        selectedCaptureField: selectedField,
        isCaptureLoading: isLoading,
        onMultimeterPress
    }
}


export default useMultimeterListener