import { useSelector } from "react-redux"
import { ItemTypes } from "../../../../constants/global"

export const useFilter = ({ itemType }) => {
    const filterCount = useSelector(state => {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return state.testPointList.settings.filterCounter
            default:
                return 0
        }
    })

    return filterCount
}