import { useCallback, useEffect, useRef, useState } from "react"
import { multimeterModalReadingListener, multimeterModalStartup, multimeterModalStopCapture, updateMeasurementCharacteristic } from "../../../../app/controllers/MultimeterController"
import { errorHandler } from "../../../../helpers/error_handler"
import { useIsFocused } from "@react-navigation/native"
import useIsAppStateActive from "../../../../hooks/useIsAppStateActive"
import { useDispatch, useSelector } from "react-redux"
import { createHistoryReading } from "../../../../app/controllers/MultimeterReadingController"
import Toast from "react-native-toast-message"
import useModal from "../../../../hooks/useModal"
import { setActiveMultimeterExecuting } from "../../../../store/actions/settings"
import { getMultimeterModeLimit } from "../../../../helpers/functions"
import { getDefaultYMax, getInitialHistoryState, getYUnitByMode, initialHistoryState, updateReading } from "../helpers/functions"
import { validateXLimit, validateYLimit } from "../helpers/validation"

const initState = {
    last: null,
    history: getInitialHistoryState()
}

export const useMultimeterModal = ({ goBack }) => {
    const connected = useSelector(state => state.settings.activeMultimeter.connected)
    const connecting = useSelector(state => state.settings.activeMultimeter.connecting)
    const paired = useSelector(state => state.settings.activeMultimeter.paired)
    const executing = useSelector(state => state.settings.activeMultimeter.executing)
    const toggleStatus = useSelector(state => state.settings.activeMultimeter.toggleStatus)

    const [reading, setReading] = useState(initState)
    const [isGraphActive, setIsGraphActive] = useState(false)
    const [loading, setLoading] = useState(true)
    const [defaultParams, setDefaultParams] = useState({
        peripheralId: null,
        captureRate: null,
        multimeterType: null,
        modes: [],
        ranges: []
    })
    const { multimeterType, peripheralId, captureRate, modes, ranges } = defaultParams
    const flagActivated = reading.last !== null && reading.last?.flag !== null
    const [selectedRange, setSelectedRange] = useState(null)
    const [selectedMode, setSelectedMode] = useState(null)
    const [updatingRange, setUpdatingRange] = useState(null)
    const [updatingMode, setUpdatingMode] = useState(null)
    const [onHold, setOnHold] = useState(false)
    const [xMax, setXMax] = useState(10000)
    const [yMax, setYMax] = useState(-5)
    const [valid, setValid] = useState({ xMax: true, yMax: true })
    const { hideModal, showModal, visible } = useModal(false)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const isAppStateActive = useIsAppStateActive()
    const isAvailable = isAppStateActive && isFocused && toggleStatus !== null
    const limit = getMultimeterModeLimit(selectedMode, toggleStatus)

    const onSetRange = useCallback(async (range) => {
        if (!flagActivated) {
            setUpdatingRange(range)
            const { status } = await updateMeasurementCharacteristic({ range, mode: selectedMode })
            if (status === 200)
                setSelectedRange(range)
            else
                errorHandler(status)
            setUpdatingRange(null)
        }
    }, [selectedMode, flagActivated])

    const onSetMode = useCallback(async (mode) => {
        setUpdatingMode(mode)
        const { status } = await updateMeasurementCharacteristic({ range: selectedRange, mode })
        if (status === 200) {
            setYMax(getDefaultYMax(mode))
            setSelectedMode(mode)
        }
        else
            errorHandler(status)
        setUpdatingMode(null)
    }, [selectedRange])

    const toggleOnHold = useCallback(() => {
        setOnHold(state => !state)
    }, [])

    useEffect(() => {
        let listener
        let lastReading

        if (!loading && selectedMode && selectedRange && captureRate && peripheralId && multimeterType && isAvailable && connected && !onHold && !connecting && !executing && toggleStatus !== null) {
            setReading(state => ({
                last: state.last,
                history: getInitialHistoryState(xMax)
            }))
            listener = multimeterModalReadingListener(
                reading => {
                    lastReading = reading
                    setReading(state => updateReading(state, reading, xMax))
                },
                (range) => setSelectedRange(range),
                () => lastReading ? saveReading(lastReading) : null,
                er => errorHandler(er.code),
                peripheralId,
                multimeterType,
                selectedMode,
                selectedRange,
                captureRate,
                toggleStatus
            )
        }
        return () => {
            if (listener?.response)
                listener.response.remove()
        }
    }, [selectedMode, selectedRange, isAppStateActive, isFocused, captureRate, peripheralId, multimeterType, loading, connected, onHold, connecting, executing, toggleStatus, xMax])

    useEffect(() => () => setLoading(true), [toggleStatus])


    useEffect(() => {
        if (isAvailable && loading && connected && !executing && !connecting) {
            multimeterModalStartup(toggleStatus,
                er => er === 101 ? goBack() : errorHandler(er, goBack),
                ({ mode, range, modes, ranges, captureRate, peripheralId, multimeterType }) => {
                    setSelectedMode(mode)
                    setSelectedRange(range)
                    setYMax(getDefaultYMax(mode))
                    setDefaultParams({
                        peripheralId,
                        captureRate,
                        multimeterType,
                        modes,
                        ranges
                    })
                    setLoading(false)
                    setOnHold(false)
                })
        }
    }, [isAvailable, loading, connected, executing, toggleStatus, connecting])

    useEffect(() => () => {
        //Stop capture when leaving MM modal
        if (multimeterType && peripheralId) {
            dispatch(setActiveMultimeterExecuting(true))
            multimeterModalStopCapture({ peripheralId, multimeterType }).finally(() => {
                dispatch(setActiveMultimeterExecuting(false))
            })
        }
    }, [multimeterType, peripheralId])

    const saveReading = useCallback(async (reading) => {
        await createHistoryReading(
            reading,
            er => errorHandler(er),
            () => Toast.show({
                type: 'successToast',
                visibilityTime: 1000,
                autoHide: true,
                props: { text: 'Reading saved' }
            }))
    }, [])

    const onDigitPress = useCallback(() => setIsGraphActive(false), [])

    const onGraphPress = useCallback(() => setIsGraphActive(true), [])

    const displayMode = Number(isGraphActive)

    const onEndEditingXMax = useCallback(({ nativeEvent: { text } }) => {
        const { valid, value } = validateXLimit(text)
        if (valid)
            setXMax(value * 1000)
        setValid(state => ({ ...state, xMax: valid }))
    }, [])

    const onEndEditingYMax = useCallback(({ nativeEvent: { text } }) => {
        const { valid, value } = validateYLimit(text)
        if (valid)
            setYMax(value)
        setValid(state => ({ ...state, yMax: valid }))
    }, [])

    const graphYUnit = getYUnitByMode(selectedMode)

    return {
        executing,
        reading: reading.last,
        historyReadings: reading.history,
        connecting,
        paired,
        connected,
        onSetRange,
        onSetMode,
        toggleOnHold,
        showModal,
        saveReading,
        hideModal,
        onDigitPress,
        onGraphPress,
        onEndEditingYMax,
        onEndEditingXMax,
        displayMode,
        modalVisible: visible,
        onHold,
        updatingRange,
        updatingMode,
        modes,
        ranges,
        isAvailable,
        loading,
        selectedMode,
        selectedRange,
        limit,
        xMax,
        yMax,
        xMaxValid: valid.xMax,
        yMaxValid: valid.yMax,
        graphYUnit
    }
}

export default useMultimeterModal