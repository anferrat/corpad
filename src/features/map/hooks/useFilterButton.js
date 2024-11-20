import { useSelector } from "react-redux"
import { useBottomSheetNavigation } from "../../../hooks/bottom_sheet/useBottomSheetNavigation"

export const useFilterButton = () => {
    const { openMapFilterMenu } = useBottomSheetNavigation()
    const counter = useSelector(state => Object.values(state.map.filters).reduce((counter, filter) => counter + filter.length, 0))
    const isVisible = useSelector(state => !state.map.loading)
    return {
        openSheet: openMapFilterMenu,
        counter,
        isVisible
    }
}