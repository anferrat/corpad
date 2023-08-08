import { useCallback, useEffect } from "react"
import { EventRegister } from "react-native-event-listeners"
import { CurrentUnits, MultimeterMeasurementTypes } from "../../../constants/global"
import fieldValidation from '../../../helpers/validation'
import { updatePotentialById } from "../store/actions/subitemList"
import { PotentialUnits } from "../../../constants/global"
import { convertVolts, convertAmps } from "../../../app/controllers/survey/other/ConverterController"
import { updatePotential } from "../../../app/controllers/survey/subitems/PotentialController"
import { getSubitemById, updateSubitem } from "../../../app/controllers/survey/subitems/SubitemController"
import { calculateCouponDensity, currentCalculation } from "../../../helpers/functions"
import { errorHandler } from "../../../helpers/error_handler"

const useMultimeterDataListener = ({ itemId, dispatch, potentialUnit }) => {
    //potentialUnit should not change when component mounted!
    const validatePotentialById = useCallback((value, subitemId, potentialId, measurementType) => {
        const validation = validateMeasuredValue(value, measurementType)
        const converted = convertVolts({ value: validation.value, inputUnit: PotentialUnits.VOLTS, outputUnit: potentialUnit }).response
        if (validation.valid) {
            updatePotential({ id: potentialId, value: validation.value, unit: PotentialUnits.VOLTS },
                er => errorHandler(er), //onError
                result => EventRegister.emit('POTENTIAL_UPDATED', result)) //onSuccess emit event for item update
            dispatch(updatePotentialById(subitemId, potentialId, converted, validation.valid))
        }
    }, [potentialUnit, dispatch, itemId])

    const validateMeasuredValue = useCallback((value, measurementType) => {
        switch (measurementType) {
            case MultimeterMeasurementTypes.POTENTIALS:
            case MultimeterMeasurementTypes.POTENTIALS_AC:
                return fieldValidation(value, 'potential')
            case MultimeterMeasurementTypes.VOLTAGE:
                return fieldValidation(value, 'voltage')
            case MultimeterMeasurementTypes.VOLTAGE_DROP:
                return fieldValidation(value, 'voltageDrop')
            case MultimeterMeasurementTypes.COUPON_CURRENT:
            case MultimeterMeasurementTypes.CURRENT:
            case MultimeterMeasurementTypes.COUPON_CURRENT_AC:
                return fieldValidation(value, 'current')
            default: return { valid: false, value: null }
        }
    }, [])

    const updateSubitemWithMeasuredValue = useCallback((subitem, measurementType, value) => {
        switch (measurementType) {
            case MultimeterMeasurementTypes.COUPON_CURRENT:
            case MultimeterMeasurementTypes.COUPON_CURRENT_AC:
                {
                    const convertedValue = convertAmps({ value: value, inputUnit: CurrentUnits.MILI_AMPS, outputUnit: CurrentUnits.MICRO_AMPS })
                    const currentDensity = calculateCouponDensity(convertedValue.response, subitem.area)
                    return updateSubitem({ ...subitem, current: convertedValue.response, density: currentDensity })
                }
            case MultimeterMeasurementTypes.CURRENT:
                return updateSubitem({ ...subitem, current: value })
            case MultimeterMeasurementTypes.VOLTAGE:
                return updateSubitem({ ...subitem, voltage: value })
            case MultimeterMeasurementTypes.VOLTAGE_DROP: {
                const current = currentCalculation(value, subitem.factor)
                return updateSubitem({ ...subitem, voltageDrop: value, current })
            }
        }
    }, [])

    const validateSubitem = useCallback(async (measurementType, subitemId, subitemType, value) => {
        const validate = validateMeasuredValue(value, measurementType)
        if (validate.valid) {
            const subitem = await getSubitemById({ subitemId, itemId, subitemType })
            if (subitem.status === 200) {
                const updated = await updateSubitemWithMeasuredValue(subitem.response, measurementType, validate.value)
                if (updated.status === 200) {
                    EventRegister.emit('SUBITEM_UPDATED', updated.response)
                }
            }
        }
        else errorHandler(504)
    }, [])

    useEffect(() => {
        const onMultimeterDataUpdate = EventRegister.addEventListener('MULTIMETER_CAPTURED_VALUES',
            ({ measurementType, itemId, subitemId, subitemType, potentials, value }) => {
                switch (measurementType) {
                    case MultimeterMeasurementTypes.POTENTIALS:
                    case MultimeterMeasurementTypes.POTENTIALS_AC:
                        potentials.forEach(({ value, potentialId }) => validatePotentialById(value, subitemId, potentialId, measurementType))
                        break
                    default: validateSubitem(measurementType, subitemId, subitemType, value)
                }
            })
        return () => {
            EventRegister.removeEventListener(onMultimeterDataUpdate)
        }
    }, [validatePotentialById])

    const onMultimeterPress = useCallback((subitemId, subitemType, measurementType, potentialId = null) => {
        EventRegister.emit('MULTIMETER_START_CAPTURE', { itemId, subitemId, subitemType, potentialId, measurementType })
    }, [])

    return {
        onMultimeterPress
    }
}


export default useMultimeterDataListener