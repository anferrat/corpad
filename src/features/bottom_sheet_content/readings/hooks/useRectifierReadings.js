import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setDisplayedReading } from "../../../../store/actions/list"
import { ItemTypes } from "../../../../constants/global"

export const useRectifierReadings = ({ closeSheet }) => {
    const dispatch = useDispatch()
    const selectedReading = useSelector(state => state.rectifierList.settings.displayedReading)

    const onSelect = useCallback((value) => {
        if (value !== selectedReading)
            dispatch(setDisplayedReading(ItemTypes.RECTIFIER, value))
        closeSheet()
    }, [selectedReading])

    return {
        selectedReading,
        onSelect
    }

}