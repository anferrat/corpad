import { useDispatch, useSelector } from "react-redux"
import { applyFilter } from "../../../../../store/actions/list"
import { useCallback, useEffect, useState } from "react"
import { ItemTypes } from "../../../../../constants/global"
import { getPipelineList } from "../../../../../app/controllers/survey/items/ItemController"
import { errorHandler } from "../../../../../helpers/error_handler"
import { EventRegister } from "react-native-event-listeners"

export const useTestPointPipelineFilter = ({ visible }) => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.testPointList.settings.appliedFilters.pipelines)
    const [pipelines, setPipelines] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (visible) {
            getPipelineList(
                er => errorHandler(er),
                list => setPipelines(list)
            )
                .finally(() => {
                    setIsLoading(false)
                })
        }

    }, [visible])

    useEffect(() => {
        const deleteListener = EventRegister.addEventListener('GLOBAL_ITEM_DELETED', ({ itemType, itemId }) => {
            if (itemType === ItemTypes.PIPELINE)
                if (~filter.indexOf(itemId))
                    dispatch(applyFilter(ItemTypes.TEST_POINT, 'pipelines', filter.filter(id => id !== itemId)))
        })
        return () => {
            EventRegister.removeEventListener(deleteListener)
        }
    }, [])

    const onApply = useCallback((filter) => dispatch(applyFilter(ItemTypes.TEST_POINT, 'pipelines', filter)), [])
    return {
        isLoading,
        pipelines,
        filter,
        onApply
    }
}