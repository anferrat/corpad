import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addAnodeBedAnode, addSoilResistivityLayer, deleteAnodeBedAnode, deleteSoilResistivityLayer, updateFactor, updateRatio, updateShorted, updateSubitemProperty, updateSubitemSubProperty, updateVoltageDrop, validateCoupon, validateSubitemProperty, validateSubitemSubProperty, updateSpacingUnit, setAnodeWireProperties } from '../../../../store/actions/subitem'

const useSubitemActions = () => {
    const dispatch = useDispatch()

    const update = useCallback((value, property) => {
        dispatch(updateSubitemProperty(value, property))
    }, [])

    const validate = useCallback((property) => {
        dispatch(validateSubitemProperty(property))
    }, [])

    const updateShortedHandler = useCallback((value) => {
        dispatch(updateShorted(value))
    }, [])

    const validateRatioHandler = useCallback((property) => {
        dispatch(updateRatio(property))
    }, [])

    const updateRatioHandler = useCallback((value, property) => {
        dispatch(updateRatio(property, value))
    }, [])

    const updateFactorHandler = useCallback((value) => {
        dispatch(updateFactor(value))
    }, [])

    const validateFactorHandler = useCallback(() => {
        dispatch(updateFactor())
    }, [])

    const validateVoltageDropHandler = useCallback(() => {
        dispatch(updateVoltageDrop())
    }, [])

    const validateCouponHandler = useCallback((property) => {
        dispatch(validateCoupon(property))
    }, [])

    const addSoilResistivityLayerHandler = useCallback(() => {
        dispatch(addSoilResistivityLayer())
    }, [])

    const deleteSoilResistivityLayerHandler = useCallback((index) => {
        dispatch(deleteSoilResistivityLayer(index))
    }, [])

    const addAnodeBedAnodeHandler = useCallback(() => {
        dispatch(addAnodeBedAnode())
    }, [])

    const deleteAnodeBedAnodeHandler = useCallback((index) => {
        dispatch(deleteAnodeBedAnode(index))
    }, [])

    const updateSubProperty = useCallback((value, property, index, parentProperty) => {
        dispatch(updateSubitemSubProperty(value, property, index, parentProperty))
    }, [dispatch])

    const validateSubProperty = useCallback((property, index, parentProperty) => {
        dispatch(validateSubitemSubProperty(property, index, parentProperty))
    }, [dispatch])

    const updateSpacingUnitHandler = useCallback((unit) => {
        dispatch(updateSpacingUnit(unit))
    }, [])

    const updateAnodeWireProperties = useCallback((wireColor, wireGauge) => {
        dispatch(setAnodeWireProperties(wireColor, wireGauge))
    }, [])

    return {
        update,
        validate,
        updateShortedHandler,
        updateRatioHandler,
        validateRatioHandler,
        updateFactorHandler,
        validateFactorHandler,
        validateVoltageDropHandler,
        validateCouponHandler,
        addSoilResistivityLayerHandler,
        deleteSoilResistivityLayerHandler,
        updateSubProperty,
        validateSubProperty,
        updateSpacingUnit: updateSpacingUnitHandler,
        addAnodeBedAnodeHandler,
        deleteAnodeBedAnodeHandler,
        updateAnodeWireProperties
    }
}

export default useSubitemActions