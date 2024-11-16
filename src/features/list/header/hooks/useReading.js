import { useSelector } from "react-redux"
import { ItemTypes } from "../../../../constants/global"

export const useReading = ({ itemType }) => {
    const reading = useSelector(state => {
        switch (itemType) {
            case ItemTypes.TEST_POINT:
                return state.testPointList.settings.displayedReading
            case ItemTypes.RECTIFIER:
                return state.rectifierList.settings.displayedReading
            default:
                return 0
        }
    })

    return reading
}