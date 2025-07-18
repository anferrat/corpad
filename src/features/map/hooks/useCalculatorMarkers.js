import { useState, useRef, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCalculatorsForDisplay } from "../../../app/controllers/CalculatorController"
import { errorHandler } from "../../../helpers/error_handler"
import { EventRegister } from "react-native-event-listeners"
import { resetCalculatorActiveMarker, setActiveCalculatorMarker } from "../../../store/actions/map"

const useCalculatorMarkers = (animateToCoordinates) => {
    const [markers, setMarkers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const areCalculatorMarkersVisible = useSelector(state => state.settings.map.isCalculatorDisplayed)
    const timestamp = useRef(null)
    const dispatch = useDispatch()

    const loadData = useCallback(async (t) => {
        setIsLoading(true)
        const { response, status } = await getAllCalculatorsForDisplay()
        if (status === 200)
            if (t === timestamp.current) {
                setMarkers(response)
                setIsLoading(false)
            }
            else
                errorHandler(status)
    }, [])

    useEffect(() => {
        const t = Date.now()
        timestamp.current = t
        if (areCalculatorMarkersVisible)
            loadData(t)
        return () => {
            if (areCalculatorMarkersVisible && t === timestamp.current) {
                setIsLoading(false)
                setMarkers([])
            }
        }
    }, [areCalculatorMarkersVisible])

    useEffect(() => {
        const createListener = EventRegister.addEventListener('CALCULATOR_CREATED', calculator => {
            if (areCalculatorMarkersVisible)
                setMarkers(state => [...state, calculator])
        })
        const deleteListener = EventRegister.addEventListener('CALCULATOR_DELETED', calculatorId => {
            if (areCalculatorMarkersVisible) {
                setMarkers(state => state.filter(({ id }) => id !== calculatorId))
                dispatch(resetCalculatorActiveMarker(calculatorId, false))
            }
        })
        const refreshListener = EventRegister.addEventListener('CALCULATOR_GROUP_DELETED', () => {
            if (areCalculatorMarkersVisible) {
                const t = Date.now()
                timestamp.current = t
                loadData(t)
                setMarkers([])
                dispatch(resetCalculatorActiveMarker(null, true))
            }
        })
        const onDisplayListener = EventRegister.addEventListener('SHOW_CALCULATOR_ON_MAP', ({ calculatorId, calculatorType, latitude, longitude, name }) => {
            //Do it regardless wether markers are visible or not. 
            dispatch(setActiveCalculatorMarker(calculatorId, calculatorType, latitude, longitude, name))
            animateToCoordinates(latitude, longitude)
        })

        return () => {
            EventRegister.removeEventListener(createListener)
            EventRegister.removeEventListener(deleteListener)
            EventRegister.removeEventListener(refreshListener)
            EventRegister.removeEventListener(onDisplayListener)
        }
    }, [areCalculatorMarkersVisible])

    return {
        markers,
        isLoading
    }
}

export default useCalculatorMarkers