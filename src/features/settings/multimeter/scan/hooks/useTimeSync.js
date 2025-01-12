import { useCallback, useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { MultimeterSyncModes } from "../../../../../constants/global"
import { getInfo, syncTime } from "../../../../../app/controllers/survey/other/TimeController"


export const useTimeSync = () => {
    const isTimeSynced = useSelector(state => state.settings.timeSync.isSynced)
    const isTimeSyncing = useSelector(state => state.settings.timeSync.isSyncing)
    const isVisible = useSelector(state => Boolean(state.settings.activeMultimeter.paired && state.settings.activeMultimeter.syncMode === MultimeterSyncModes.GPS && state.settings.activeMultimeter.onOffCaptureActive))
    const timeSyncMode = useSelector(state => state.settings.timeSync.mode)
    const componentMounted = useRef(true)



    const [info, setInfo] = useState({
        delta: null,
        timestamp: null,
        source: null,
        loading: true
    })

    const isLoading = isTimeSyncing || info.loading

    useEffect(() => {
        componentMounted.current = true
        loadInfo()
        return () => componentMounted.current = false
    }, [])

    const loadInfo = async () => {
        const { status, response } = await getInfo()
        if (status === 200 && response.delta && response.timestamp) {
            if (componentMounted.current)
                setInfo({
                    delta: response.delta,
                    timestamp: response.timestamp,
                    source: response.source,
                    loading: false
                })
        }
        else if (componentMounted.current)
            setInfo(state => ({ ...state, loading: false }))
    }

    useEffect(() => {
        return () => {
            if (isLoading)
                loadInfo()
        }
    }, [isLoading])

    const onSyncPress = useCallback(async () => {
        if (!isLoading) {
            setInfo(state => ({ ...state, loading: true }))
            await syncTime({ source: timeSyncMode })
            if (componentMounted.current)
                setInfo(state => ({ ...state, loading: false }))
        }
    }, [timeSyncMode, isLoading])


    return {
        isVisible,
        isTimeSynced,
        delta: info.delta,
        timestamp: info.timestamp,
        source: info.source,
        isLoading,
        onSyncPress,
    }
}