import { useState, useEffect, useCallback } from "react"
import { updateMultimeterOnOffCapture, getMultimeterSettings } from "../../../../app/controllers/MultimeterController"
import { errorHandler } from "../../../../helpers/error_handler"

const useOnOffCaptureActive = () => {
    const [onOffCaptureActive, setOnOffCaptureActive] = useState(false)

    useEffect(() => {
        //get OnOffCapture setting on Load. it's is stored here instead of global state, since it is not possible to change this setting anywhere else.
        const loadData = async () => {
            const { status, response } = await getMultimeterSettings()
            if (status === 200) {
                const { onOffCaptureActive } = response
                setOnOffCaptureActive(onOffCaptureActive)
            }
        }
        loadData()
    }, [])

    const onOffCaptureToggleHandler = useCallback(async (bool) => {
        //handles change of onOffCaptureActive settings, updates states and db
        setOnOffCaptureActive(bool)
        const { status } = await updateMultimeterOnOffCapture({ onOffCaptureActive: bool })
        if (status !== 200) {
            errorHandler(status)
        }
    }, [])

    return {
        onOffCaptureActive,
        onOffCaptureToggleHandler
    }
}

export default useOnOffCaptureActive