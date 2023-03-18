import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updateFactor, updateRatio, updateShorted, updateSubitemProperty, updateVoltageDrop, validateCoupon, validateSubitemProperty } from '../../../../store/actions/subitem'

const useSubitemActions = () => {
    const dispatch = useDispatch()

    const update = useCallback((value, property) => {
        dispatch(updateSubitemProperty(value, property))
    }, [dispatch])

    const validate = useCallback((property) => {
        dispatch(validateSubitemProperty(property))
    }, [dispatch])

    const updateShortedHandler = useCallback((value) => {
        dispatch(updateShorted(value))
    }, [dispatch])

    const validateRatioHandler = useCallback((property) => {
        dispatch(updateRatio(property))
    }, [dispatch])

    const updateRatioHandler = useCallback((value, property) => {
        dispatch(updateRatio(property, value))
    }, [dispatch])

    const updateFactorHandler = useCallback((value) => {
        dispatch(updateFactor(value))
    }, [dispatch])

    const validateFactorHandler = useCallback(() => {
        dispatch(updateFactor())
    }, [dispatch])

    const validateVoltageDropHandler = useCallback(() => {
        dispatch(updateVoltageDrop())
    }, [dispatch])

    const validateCouponHandler = useCallback((property) => {
        dispatch(validateCoupon(property))
    }, [dispatch])

    return {
        update,
        validate,
        updateShortedHandler,
        updateRatioHandler,
        validateRatioHandler,
        updateFactorHandler,
        validateFactorHandler,
        validateVoltageDropHandler,
        validateCouponHandler
    }
}

export default useSubitemActions