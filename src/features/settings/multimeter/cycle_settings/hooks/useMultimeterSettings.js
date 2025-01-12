import { useState, useCallback, useEffect, useRef } from 'react'
import { getMultimeterSettings, updateMultimeterSettings } from '../../../../../app/controllers/MultimeterController'
import { errorHandler } from '../../../../../helpers/error_handler'
import { validateSettings } from '../helpers/cycleTime_validation'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setMultimeterSettings } from '../../../../../store/actions/settings'
import { hapticKeyboardPress, hapticMedium } from '../../../../../native_libs/haptics'
import { MultimeterSyncModes } from '../../../../../constants/global'

const useMultimeterSettings = () => {
    const [onTime, setOnTime] = useState({ value: null, valid: true })
    const [offTime, setOffTime] = useState({ value: null, valid: true })
    const [delay, setDelay] = useState({ value: null, valid: true })
    const [onSetup, setOnSetup] = useState({ value: null, valid: true })
    const [offDelay, setOffDelay] = useState({ value: null, valid: true })
    const [onOffCaptureActive, setOnOffCaptureActive] = useState(false)
    const [timeSyncMode, setTimeSyncMode] = useState(null)
    const [captureRate, setCaptureRate] = useState(null)
    const [syncMode, setSyncMode] = useState(null)
    const [firstCycle, setFirstCycle] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorCodes, setErrorCodes] = useState([])
    const componentMounted = useRef(true)
    const scrollViewRef = useRef()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const isTimeSync = syncMode === MultimeterSyncModes.GPS

    useEffect(() => {
        componentMounted.current = true
        const loadData = async () => {
            setIsLoading(true)
            const { status, response } = await getMultimeterSettings()
            if (status === 200) {
                const { onTime, offTime, syncMode, onOffCaptureActive, timeSyncMode, offDelay, onSetup, captureRate, firstCycle } = response
                if (componentMounted.current) {
                    setOnTime({ value: onTime, valid: true })
                    setOffTime({ value: offTime, valid: true })
                    setDelay({ value: delay, valid: true })
                    setFirstCycle(firstCycle)
                    setSyncMode(syncMode)
                    setOnOffCaptureActive(onOffCaptureActive)
                    setTimeSyncMode(timeSyncMode)
                    setOffDelay({ value: offDelay, valid: true })
                    setOnSetup({ value: onSetup, valid: true })
                    setCaptureRate(captureRate)
                    setErrorCodes([])
                    setIsLoading(false)
                }
            }
            else {
                errorHandler(status)
            }
        }
        loadData()
        return () => {
            componentMounted.current = false
        }
    }, [])

    const onOnCycleChanged = useCallback((value) => {
        setOnTime(state => ({ ...state, value }))
    }, [])

    const onOffCycleChanged = useCallback((value) => {
        setOffTime(state => ({ ...state, value }))
    }, [])

    const onOnSetupChanged = useCallback((value) =>
        setOnSetup(state => ({ ...state, value })), [])

    const onOffDelayChanged = useCallback((value) => {
        setOffDelay(state => ({ ...state, value }))
    }, [])

    const validate = useCallback((onTime, offTime, onSetup, offDelay, isTimeSync, onOffCaptureActive) => {
        const settings = validateSettings(onTime, offTime, onSetup, offDelay, isTimeSync, onOffCaptureActive)
        setOnTime({ value: settings.onTime, valid: settings.valid.onTime })
        setOffTime({ value: settings.offTime, valid: settings.valid.offTime })
        setOnSetup({ value: settings.onSetup, valid: settings.valid.onSetup })
        setOffDelay({ value: settings.offDelay, valid: settings.valid.offDelay })
        setErrorCodes(settings.errorCodes)
        settings.errorCodes.length > 0 ? scrollToTop() : null
    }, [])

    const validateEntry = useCallback(() => {
        validate(onTime.value, offTime.value, onSetup.value, offDelay.value, isTimeSync, onOffCaptureActive)
    }, [validate, onTime, offTime, onSetup, offDelay, isTimeSync, onOffCaptureActive])

    const setStandardCycleTime = useCallback((on, off) => {
        validate(on, off, onSetup.value, offDelay.value, isTimeSync, onOffCaptureActive)
        hapticKeyboardPress()
    }, [onSetup, offDelay, isTimeSync, onOffCaptureActive])

    const onFirstCycleChange = useCallback((value) => {
        setFirstCycle(value)
    }, [])

    const onSyncModeChange = useCallback((value) => {
        setSyncMode(value)
        const isTimeSync = value === MultimeterSyncModes.GPS
        validate(onTime.value, offTime.value, onSetup.value, offDelay.value, isTimeSync, onOffCaptureActive)
    }, [onTime, offTime, onSetup, offDelay, onOffCaptureActive, validate])

    const onTimeSyncChanged = useCallback((value) => {
        setTimeSyncMode(value)
    }, [])

    const onCycleCaptureActiveChanged = useCallback((value) => {
        validate(onTime.value, offTime.value, onSetup.value, offDelay.value, isTimeSync, value)
        setOnOffCaptureActive(value)
    }, [onTime, offTime, onSetup, offDelay, isTimeSync, validate])

    const onCaptureRateChanged = useCallback((value) => {
        setCaptureRate(value)
    }, [])

    const scrollToTop = useCallback(() => {
        if (scrollViewRef.current?.scrollTo) {
            scrollViewRef.current.scrollTo({
                y: 0,
                animated: true,
            })
        }
    }, [scrollViewRef])

    const onSaveHandler = useCallback(async () => {
        const settings = validateSettings(onTime.value, offTime.value, onSetup.value, offDelay.value, isTimeSync, onOffCaptureActive)
        if (onTime.valid && offTime.valid && onSetup.valid && offDelay.valid) {
            const { status, response } = await updateMultimeterSettings({
                onTime: settings.onTime,
                offTime: settings.offTime,
                syncMode,
                firstCycle,
                onOffCaptureActive,
                captureRate,
                timeSyncMode,
                onSetup: settings.onSetup,
                offDelay: settings.offDelay
            })
            if (status === 200) {
                dispatch(setMultimeterSettings(response.syncMode, response.onTime, response.offTime, response.firstCycle, response.onSetup, response.offDelay, response.onOffCaptureActive, response.captureRate, response.timeSyncMode))
                navigation.goBack()
                hapticMedium()
            }
            else {
                errorHandler(status)
            }
        }
        else {
            validate(onTime.value, offTime.value, onSetup.value, offDelay.value, isTimeSync, onOffCaptureActive)
        }
    }, [onTime, offTime, syncMode, firstCycle, scrollToTop, onOffCaptureActive, firstCycle, captureRate, timeSyncMode])

    return {
        isLoading,
        onTime,
        offTime,
        delay,
        syncMode,
        firstCycle,
        onSetup,
        offDelay,
        captureRate,
        onOffCaptureActive,
        timeSyncMode,
        scrollViewRef,
        errorCodes,
        onOnCycleChanged,
        onOffCycleChanged,
        validateEntry,
        setStandardCycleTime,
        onFirstCycleChange,
        onSyncModeChange,
        onSaveHandler,
        onTimeSyncChanged,
        onCycleCaptureActiveChanged,
        onCaptureRateChanged,
        onOnSetupChanged,
        onOffDelayChanged
    }
}

export default useMultimeterSettings