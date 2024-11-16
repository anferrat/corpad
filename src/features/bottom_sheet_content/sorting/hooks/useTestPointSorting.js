
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ItemTypes } from "../../../../constants/global"
import { setSortingSetting } from "../../../../store/actions/list"

const useTestPointSorting = ({ closeSheet }) => {
    const selectedSorting = useSelector(state => state.testPointList.settings.sorting)
    const dispatch = useDispatch()

    const setSelectedSorting = useCallback((sorting) => {
        if (sorting !== selectedSorting)
            dispatch(setSortingSetting(ItemTypes.TEST_POINT, sorting))
        closeSheet()
    }, [selectedSorting])

    const refresh = () => {
        dispatch(setSortingSetting(ItemTypes.TEST_POINT, selectedSorting))
        closeSheet()
    }

    return { selectedSorting, setSelectedSorting, refresh }

}

export default useTestPointSorting
