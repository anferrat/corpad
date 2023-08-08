import { useState, useCallback, useEffect, useRef } from 'react'
import { getMultimeterSettings, updateMultimeterSettings } from '../../../../../app/controllers/MultimeterController'
import { errorHandler } from '../../../../../helpers/error_handler'
import { validateCycleTime } from '../helpers/cycleTime_validation'
import { standardCycleTimes } from '../helpers/standardCycleTimes'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setMultimeterSettings } from '../../../../../store/actions/settings'
import { hapticKeyboardPress, hapticMedium } from '../../../../../native_libs/haptics'

const useMultimeterSettings = () => {
    const [onTime, setOnTime] = useState({ value: null, valid: true })
    const [offTime, setOffTime] = useState({ value: null, valid: true })
    const [delay, setDelay] = useState({ value: null, valid: true })
    const [syncMode, setSyncMode] = useState(null)
    const [firstCycle, setFirstCycle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [multimeterType, setMultimeterType] = useState(null)
    const componentMounted = useRef(true)
    const standardCycles = standardCycleTimes[multimeterType] ?? []
    const dispatch = useDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        componentMounted.current = true
        const loadData = async () => {
            const { status, response } = await getMultimeterSettings()
            if (status === 200) {
                const { onTime, offTime, delay, syncMode, type, firstCycle } = response
                if (componentMounted.current) {
                    setOnTime({ value: onTime, valid: true })
                    setOffTime({ value: offTime, valid: true })
                    setDelay({ value: delay, valid: true })
                    setFirstCycle(firstCycle)
                    setSyncMode(syncMode)
                    setMultimeterType(type)
                    setLoading(false)
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
        setOnTime(state => ({ ...state, value: value }))
    }, [])

    const onOffCycleChanged = useCallback((value) => {
        setOffTime(state => ({ ...state, value: value }))
    }, [])

    const onCycleValidate = useCallback(() => {
        const { valid, value } = validateCycleTime(onTime.value, multimeterType)
        setOnTime({ valid, value })
    }, [onTime, multimeterType])

    const offCycleValidate = useCallback(() => {
        const { valid, value } = validateCycleTime(offTime.value, multimeterType)
        setOffTime({ valid, value })
    }, [offTime, multimeterType])

    const setStandardCycleTime = useCallback((on, off) => {
        setOnTime({ valid: true, value: on })
        setOffTime({ valid: true, value: off })
        hapticKeyboardPress()
    }, [])

    const onFirstCycleChange = useCallback((value) => {
        setFirstCycle(value)
    }, [])

    const onSyncModeChange = useCallback((value) => {
        setSyncMode(value)
    }, [])

    const onSaveHandler = useCallback(async () => {
        if (onTime.valid && offTime.valid && delay.valid) {
            const { status } = await updateMultimeterSettings({ onTime: onTime.value, offTime: offTime.value, delay: delay.value, syncMode, firstCycle, multimeterType })
            if (status === 200) {
                dispatch(setMultimeterSettings(syncMode, onTime.value, offTime.value, delay.value, firstCycle))
                navigation.goBack()
                hapticMedium()
            }
            else errorHandler(status)
        }
        else errorHandler(505)
    }, [onTime, offTime, delay, syncMode, firstCycle, multimeterType])

    return {
        onTime,
        offTime,
        delay,
        syncMode,
        loading,
        standardCycles,
        multimeterType,
        firstCycle,
        onOnCycleChanged,
        onOffCycleChanged,
        onCycleValidate,
        offCycleValidate,
        setStandardCycleTime,
        onFirstCycleChange,
        onSyncModeChange,
        onSaveHandler
    }
}

export default useMultimeterSettings