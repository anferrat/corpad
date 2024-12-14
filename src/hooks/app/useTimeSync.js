import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setIsTimeSynced } from "../../store/actions/settings"
import { MultimeterSyncModes, TimeSyncSources } from "../../constants/global"
import { addTimeSyncListener } from "../../app/controllers/survey/other/TimeController"

const useTimeSync = () => {
    const isSyncActive = useSelector(state => (
        //Only sync time when there is paired multimeter and it is set to record GPS synced values
        Boolean(state.settings.activeMultimeter.paired && state.settings.activeMultimeter.syncMode === MultimeterSyncModes.GPS)
    ))
    const dispatch = useDispatch()

    useEffect(() => {
        let listener
        if (isSyncActive) {
            listener = addTimeSyncListener((isSynced) => dispatch(setIsTimeSynced(isSynced)), TimeSyncSources.MIXED)
        }
        return () => {
            if (listener)
                listener.response()
        }
    }, [isSyncActive])
}

export default useTimeSync