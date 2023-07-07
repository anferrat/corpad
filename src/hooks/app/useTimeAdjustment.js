import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { addTimeAdjustmentListener } from "../../app/controllers/survey/other/GeolocationController"
import { setGpsTimeAdjustment } from "../../store/actions/settings"
import { MultimeterSyncModes } from "../../constants/global"

const useTimeAdjustment = () => {
    const timeAdjustmentActive = useSelector(state => (
        //Only sync GPS time when there is paired multimeter and it is set to record GPS synced values
        state.settings.activeMultimeter.paired && state.settings.activeMultimeter.syncMode === MultimeterSyncModes.GPS
    ))
    const dispatch = useDispatch()

    useEffect(() => {
        let listener
        if (timeAdjustmentActive) {
            listener = addTimeAdjustmentListener(({ device, gnss }) => {
                dispatch(setGpsTimeAdjustment(device, gnss))
            }).response
        }
        return () => {
            if (listener){
                listener()
            }
               
        }
    }, [timeAdjustmentActive])
}

export default useTimeAdjustment