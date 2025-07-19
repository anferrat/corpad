import { useCallback } from 'react'
import { updatePotential } from '../../../app/controllers/survey/subitems/PotentialController'
import { updateSubitem } from '../../../app/controllers/survey/subitems/SubitemController'
import { errorHandler } from '../../../helpers/error_handler'
import { updatePotentialAction, updatePropertyAction } from '../store/actions/subitemList'
import fieldValidation from '../../../helpers/validation'
import { calculateCouponDensity, currentCalculation, currentCalculation2 } from '../../../helpers/functions'
import { EventRegister } from 'react-native-event-listeners'


const useSubitemListActions = (dispatch) => {

    const updatePotentialValue = useCallback((value, subitemIndex, potentialIndex) => {
        dispatch(updatePotentialAction(subitemIndex, potentialIndex, value))
    }, [dispatch])

    const updatePropertyValue = useCallback((value, subitemIndex, property) => {
        dispatch(updatePropertyAction(subitemIndex, { [property]: value }))
    }, [dispatch])


    const validatePotential = useCallback(async (value, unit, subitemIndex, potentialId, potentialIndex, isAc) => {
        const validation = fieldValidation(value, isAc ? 'potentialAc' : 'potential')
        if (validation.valid)
            await updatePotential({ id: potentialId, value: validation.value, unit: unit, isAc }, er => errorHandler(er), result => EventRegister.emit('POTENTIAL_UPDATED', result))
        dispatch(updatePotentialAction(subitemIndex, potentialIndex, validation.value, validation.valid))
    }, [dispatch])


    const validateCouponCurrent = useCallback(async (subitemIndex, subitem) => {
        const { value, valid } = fieldValidation(subitem.current, 'current')
        if (!valid)
            dispatch(updatePropertyAction(subitemIndex, { current: value }, { current: valid }))
        else {
            const density = calculateCouponDensity(value, subitem.area)
            await updateSubitem({ ...subitem, current: value, density: density }, er => errorHandler(er), result => EventRegister.emit('SUBITEM_UPDATED', result))
        }
    }, [dispatch])

    const validateVoltageDrop = useCallback(async (subitemIndex, subitem) => {
        const { value, valid } = fieldValidation(subitem.voltageDrop, 'voltageDrop')
        if (!valid)
            dispatch(updatePropertyAction(subitemIndex, { voltageDrop: value }, { voltageDrop: valid }))
        else {
            const current = currentCalculation(value, subitem.factor)
            await updateSubitem({ ...subitem, current: current, voltageDrop: value }, er => errorHandler(er), result => EventRegister.emit('SUBITEM_UPDATED', result))
        }
    }, [dispatch])

    const validateCurrent = useCallback(async (subitemIndex, subitem) => {
        const { value, valid } = fieldValidation(subitem.current, 'current')
        if (valid)
            await updateSubitem({ ...subitem, current: value }, er => errorHandler(er), result => EventRegister.emit('SUBITEM_UPDATED', result))
        else
            dispatch(updatePropertyAction(subitemIndex, { current: value }, { current: valid }))
    }, [dispatch])

    const updateShorted = useCallback(async (shorted, subitemIndex, subitem) => {
        dispatch(updatePropertyAction(subitemIndex, { shorted: shorted }))
        await updateSubitem({ ...subitem, shorted: shorted, current: null }, er => errorHandler(er), result => EventRegister.emit('SUBITEM_UPDATED', result))
    }, [dispatch])

    const validateVoltage = useCallback(async (subitemIndex, subitem) => {
        const { value, valid } = fieldValidation(subitem.voltage, 'voltage')
        if (valid)
            await updateSubitem({ ...subitem, voltage: value }, er => errorHandler(er), result => EventRegister.emit('SUBITEM_UPDATED', result))
        else
            dispatch(updatePropertyAction(subitemIndex, { voltage: value }, { voltage: valid }))
    }, [dispatch])

    const validateVoltageDropForCircuit = useCallback(async (subitemIndex, subitem) => {
        const { value, valid } = fieldValidation(subitem.voltageDrop, 'voltageDrop')
        if (!valid || value === null)
            dispatch(updatePropertyAction(subitemIndex, { voltageDrop: value }, { voltageDrop: valid }))
        else {
            const current = currentCalculation2(value, subitem.ratioCurrent, subitem.ratioVoltage)
            await updateSubitem({ ...subitem, current: current, voltageDrop: value }, er => errorHandler(er), result => EventRegister.emit('SUBITEM_UPDATED', result))
        }
    }, [])

    return {
        validatePotential,
        updatePotentialValue,
        updatePropertyValue,
        validateCouponCurrent,
        validateVoltageDrop,
        validateCurrent,
        updateShorted,
        validateVoltage,
        validateVoltageDropForCircuit
    }
}

export default useSubitemListActions