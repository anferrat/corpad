import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setIsTimeSynced } from "../../store/actions/settings"
import { MultimeterSyncModes } from "../../constants/global"
import { addTimeSyncListener } from "../../app/controllers/survey/other/TimeController"

const useTimeSync = () => {
    //Only sync time when there is paired multimeter and it is set to record GPS synced values
    const isSyncNeeded = useSelector(state => Boolean(state.settings.activeMultimeter.paired && state.settings.activeMultimeter.syncMode === MultimeterSyncModes.GPS && state.settings.activeMultimeter.onOffCaptureActive))
    const timeSyncMode = useSelector(state => state.settings.timeSync.mode)
    const isSyncActive = isSyncNeeded && timeSyncMode !== null
    const dispatch = useDispatch()

    useEffect(() => {
        let listener
        if (isSyncActive) {
            listener = addTimeSyncListener(({ isSynced, isSyncing }) =>
                dispatch(setIsTimeSynced(isSynced, isSyncing)), timeSyncMode)
        }
        return () => {
            if (listener) {
                listener.response()
            }
        }
    }, [timeSyncMode, isSyncActive])
}

export default useTimeSync