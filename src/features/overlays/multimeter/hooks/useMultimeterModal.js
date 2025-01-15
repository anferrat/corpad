import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { rangeOptions } from "../helpers/functions"
import { MultimeterModes } from "../../../../constants/global"
import { updateMeasurementCharacteristic } from "../../../../app/controllers/MultimeterController"
import { errorHandler } from "../../../../helpers/error_handler"

export const useMultimeterModal = () => {
    const [reading, setReading] = useState(null)
    const multimeterType = useSelector(state => state.settings.activeMultimeter.multimeterType)
    const [selectedRange, setSelectedRange] = useState(null)
    const [selectedMode, setSelectedMode] = useState(null)
    const [updatingRange, setUpdatingRange] = useState(null)
    const [updatingMode, setUpdatingMode] = useState(null)
    const ranges = rangeOptions[multimeterType] ?? {}
    const modes = MultimeterModes[multimeterType] ?? {}

    const onSetRange = useCallback(async (range) => {
        setUpdatingRange(range)
        const { status } = await updateMeasurementCharacteristic({ range, mode: selectedMode })
        if (status === 200)
            setSelectedRange(range)
        else
            errorHandler(status)
        setUpdatingRange(null)
    }, [selectedMode])

    const onSetMode = useCallback(async (mode) => {
        setUpdatingMode(mode)
        const { status } = await updateMeasurementCharacteristic({ range: selectedRange, mode })
        if (status === 200)
            setSelectedMode(mode)
        else
            errorHandler(status)
        setUpdatingMode(null)
    }, [selectedRange])

    useEffect(() => { }, [selectedMode, selectedRange])



    return {
        reading,

    }
}

export default useMultimeterModal