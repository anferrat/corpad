import { useDispatch, useSelector } from "react-redux"
import { setIsCalculatorDisplayed } from "../../../store/actions/settings"
import { useCallback, useState } from "react"
import { resetCalculatorActiveMarker } from "../../../store/actions/map"
import { updateIsCalculatorMarkerDisplayedSetting } from "../../../app/controllers/CalculatorController"

const useCalculatorOptions = () => {
    const [isUpdating, setIsUpdating] = useState(false)
    const isCalculatorVisible = useSelector(state => state.settings.map.isCalculatorDisplayed)
    const dispatch = useDispatch()

    const toggleCalculatorVisible = useCallback(async (newState) => {
        if (!isUpdating) {
            setIsUpdating(true)
            const { status } = await updateIsCalculatorMarkerDisplayedSetting(newState)
            if (status === 200) {
                dispatch(setIsCalculatorDisplayed(newState))
                if (!newState)
                    dispatch(resetCalculatorActiveMarker(null, true))
            }
            setIsUpdating(false)
        }
    }, [isUpdating])

    return {
        isChecked: isCalculatorVisible,
        toggleCalculator: toggleCalculatorVisible,
    }
}

export default useCalculatorOptions