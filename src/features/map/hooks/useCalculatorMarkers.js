import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { getAllCalculatorsForDisplay } from "../../../app/controllers/CalculatorController"
import { errorHandler } from "../../../helpers/error_handler"

const useCalculatorMarkers = () => {
    const [markers, setMarkers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const areCalculatorMarkersVisible = useSelector(state => state.settings.map.isCalculatorDisplayed)
    const timestamp = useRef(null)

    useEffect(() => {
        const t = Date.now()
        timestamp.current = t
        if (areCalculatorMarkersVisible) {
            setIsLoading(true)
            const loadData = async () => {
                const { response, status } = await getAllCalculatorsForDisplay()
                if (status === 200)
                    if (t === timestamp.current) {
                        setMarkers(response)
                        setIsLoading(false)
                    }
                    else
                        errorHandler(status)
            }
            loadData()
        }
        return () => {
            if (areCalculatorMarkersVisible && t === timestamp.current) {
                setIsLoading(false)
                setMarkers([])
            }
        }
    }, [areCalculatorMarkersVisible])

    return {
        markers,
        isLoading
    }
}

export default useCalculatorMarkers