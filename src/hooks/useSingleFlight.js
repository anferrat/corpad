import { useCallback, useEffect, useRef, useState } from 'react'

const useSingleFlight = () => {
    const inFlight = useRef(false)
    const mounted = useRef(true)
    const [isBusy, setIsBusy] = useState(false)

    useEffect(() => () => {
        mounted.current = false
    }, [])

    const run = useCallback(async (operation) => {
        if (inFlight.current)
            return

        inFlight.current = true
        if (mounted.current)
            setIsBusy(true)

        try {
            return await operation()
        }
        finally {
            inFlight.current = false
            if (mounted.current)
                setIsBusy(false)
        }
    }, [])

    return {
        isBusy,
        run
    }
}

export default useSingleFlight
