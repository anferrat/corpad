import { useSelector } from "react-redux"
import { ItemTypes } from "../../../../constants/global"

export const useSorting = ({ itemType }) => {
    const sorting = useSelector(state => {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return state.testPointList.settings.sorting
            case ItemTypes.RECTIFIER:
                return state.rectifierList.settings.sorting
            default:
                return null
        }
    })
    return sorting
}