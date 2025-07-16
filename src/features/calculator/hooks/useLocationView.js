import { useCallback } from "react"
import useModal from "../../../hooks/useModal"
import validation from "../../../helpers/validation"

const useLocationView = (setCalculatorData, setCoordValid, latitude, longitude) => {
    const { visible, showModal, hideModal } = useModal()

    const updateLatAndLon = useCallback((latitude, longitude) => {
        setCalculatorData({ latitude, longitude })
        setCoordValid({ latitude: true, longitude: true })
    }, [])

    const onLatitudeChange = useCallback((text) => setCalculatorData({ latitude: text }), [])

    const onLongitudeChange = useCallback((text) => setCalculatorData({ longitude: text }), [])

    const onLatitudeEndEdit = useCallback(() => {
        const { valid, value } = validation(latitude, 'latitude')
        if (valid)
            setCalculatorData(({ latitude: value }))
        setCoordValid(old => ({ ...old, latitude: valid }))
    }, [latitude])

    const onLongitudeEndEdit = useCallback(() => {
        const { valid, value } = validation(longitude, 'longitude')
        if (valid)
            setCalculatorData(({ longitude: value }))
        setCoordValid(old => ({ ...old, longitude: valid }))
    }, [longitude])

    return {
        onLatitudeChange,
        onLongitudeChange,
        onLatitudeEndEdit,
        onLongitudeEndEdit,
        visible,
        showModal,
        hideModal,
        updateLatAndLon,
    }
}

export default useLocationView