
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ItemTypes } from "../../../../constants/global"
import { setSortingSetting } from "../../../../store/actions/list"

const useRectifierSorting = ({ closeSheet }) => {
    const selectedSorting = useSelector(state => state.rectifierList.settings.sorting)
    const dispatch = useDispatch()

    const setSelectedSorting = useCallback((sorting) => {
        if (sorting !== selectedSorting)
            dispatch(setSortingSetting(ItemTypes.RECTIFIER, sorting))
        closeSheet()
    }, [selectedSorting])

    const refresh = useCallback(() => {
        dispatch(setSortingSetting(ItemTypes.RECTIFIER, sorting))
    }, [])

    return { selectedSorting, setSelectedSorting, refresh }

}

export default useRectifierSorting
