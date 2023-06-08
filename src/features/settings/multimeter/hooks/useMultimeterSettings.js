import { useState, useCallback, useEffect, useRef } from 'react'
import { getMultimeterSettings } from '../../../../app/controllers/MultimeterController'
import { errorHandler } from '../../../../helpers/error_handler'

const useMultimeterSettings = () => {
    const [onTime, setOnTime] = useState({ value: null, valid: true })
    const [offTime, setOffTime] = useState({ value: null, valid: true })
    const [delay, setDelay] = useState({ value: null, valid: true })
    const [syncMode, setSyncMode] = useState(null)
    const [loading, setLoading] = useState(true)
    const componentMounted = useRef(true)

    useEffect(() => {
        componentMounted.current = true
        const loadData = async () => {
            const { status, response } = await getMultimeterSettings()
            if (status === 200) {
                const { onTime, offTime, delay, syncMode } = response
                if (componentMounted.current) {
                    setOnTime({ value: onTime, valid: true })
                    setOffTime({ value: offTime, valid: true })
                    setDelay({ value: delay, valid: true })
                    setSyncMode(syncMode)
                    setLoading(false)
                }
            }
            else {
                errorHandler(status)
            }
        }
        loadData()
        return () => {
            componentMounted.current = false
        }
    }, [])

    return {
        onTime,
        offTime,
        delay,
        syncMode,
        loading
    }
}

export default useMultimeterSettings