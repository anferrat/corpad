import { useSelector } from "react-redux"

export const useTestPointFilterCounter = (filterName) => {
    const statusCounter = useSelector(state => state.testPointList.settings.appliedFilters.statusFilter?.length ?? 0)
    const readingCounter = useSelector(state => state.testPointList.settings.appliedFilters.readingTypeFilter?.length ?? 0)
    const testPointTypeCounter = useSelector(state => state.testPointList.settings.appliedFilters.testPointTypeFilter?.length ?? 0)

    return {
        statusCounter,
        readingCounter,
        testPointTypeCounter
    }
}